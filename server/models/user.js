const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;

// models
const AuthToken = require("./authToken");

const { milliFromNow } = require("../utils/timeUtils");
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
  console.log("Expires", expires);

  // Token
  const token = jwt
    .sign({
      _id: _id.toString(),
      expires,
      role
    })
    .toString();

  console.log("Token", token);

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

    return { token, expires };
  } catch (err) {
    console.log("Err: generateAuthToken", err);
    return {
      err: "generateAuthToken",
      msg: "An error ocurred while trying to generate the auth token."
    };
  }
};

const User = mongoose.model("user", UserSchema);

module.exports = User;
