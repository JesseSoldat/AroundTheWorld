const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;

const { milliFromNow, daysFromNow } = require("../utils/timeUtils");
const tokenExpirationTime = 30 * 1000; // 30 seconds TESTING
const tokenExpirationDays = 1; // 1 days; USE this for real token

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
    avatar: { type: String, default: null },
    gender: { type: String, default: null },
    hometown: { type: String, default: "" },
    birthDate: { type: Date },
    about: {
      type: String,
      default: ""
    },
    occupation: { type: String, default: "" },
    role: { type: String, default: "user" },
    friends: { type: [String] }
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

  if (user.isModified("password") || user.isNew) {
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
  try {
    const { _id, username, role } = user;

    // const expires = milliFromNow(tokenExpirationTime);
    const expires = daysFromNow(new Date(), tokenExpirationDays);

    // Token
    const token = jwt
      .sign(
        {
          _id: _id.toString(),
          username,
          role,
          exp: expires
        },
        process.env.TOKEN_SECRET
      )
      .toString();

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
    const decodedToken = await new Promise(resolve => {
      jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
        if (err || !decodedToken) return resolve(null);

        resolve(decodedToken);
      });
    });

    if (!decodedToken) return null;

    const user = await User.findOne({ _id: decodedToken._id });

    return user ? user : null;
  } catch (err) {
    console.log("Err: findByToken", err);
    return null;
  }
};

const User = mongoose.model("user", UserSchema);

module.exports = User;
