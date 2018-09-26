const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;

// models
const AuthToken = require("./authToken");

const { milliFromNow, daysFromNow } = require("../utils/timeUtils");
const tokenExpirationTime = 30 * 1000; // 30 seconds TESTING
const tokenExpirationDays = 7; // 7 days; USE this for real token

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 1
    },
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    role: { type: String, default: "user" }
  },
  { timestamps: true }
);

UserSchema.methods.toJSON = function() {
  const user = this;
  const userObj = user.toObject();
  const { username, email, _id, role } = userObj;

  return { username, email, _id, role };
};

UserSchema.pre("save", function(next) {
  const user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.methods.generateAuthToken = async function() {
  const user = this;
  const { _id, role } = user;

  // Testing 30 seconds from now
  const expires = milliFromNow(tokenExpirationTime);
  // const expires = daysFromNow(new Date(), tokenExpirationDays);

  // Token
  const token = jwt
    .sign(
      {
        _id: _id.toString(),
        expires,
        role
      },
      process.env.TOKEN_SECRET
    )
    .toString();

  try {
    // Check if the user already has a token array
    const authToken = await AuthToken.findOne({ user: _id });

    // Use existing auth token document
    if (authToken) {
      authToken.tokens.push(token);

      if (authToken.tokens.length > 5) authToken.tokens.shift();

      await authToken.save();
    }
    // Create a new auth token document
    else {
      const newAuthToken = new AuthToken({ tokens: [token], user: _id });

      await newAuthToken.save();
    }

    return { token };
  } catch (err) {
    console.log("Err: generateAuthToken", err);
    return {
      err: "An error ocurred while trying to generate the auth token."
    };
  }
};

UserSchema.statics.findByCredentials = async function(email, password) {
  const User = this;

  try {
    const user = await User.findOne({ email });

    if (!user) return null;

    const matchedUser = await new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, matched) => {
        matched ? resolve(user) : resolve(null);
      });
    });

    return matchedUser;
  } catch (err) {
    return null;
  }
};

UserSchema.statics.findByToken = async function(token) {
  const User = this;

  try {
    const authToken = await AuthToken.findOne({ tokens: token });

    if (authToken && authToken.tokens.indexOf(token) !== -1) {
      const user = await User.findOne({ _id: authToken.user });
      return user;
    }
    return null;
  } catch (err) {
    console.log("Err: findByToken", err);
    return null;
  }
};

const User = mongoose.model("user", UserSchema);

module.exports = User;
