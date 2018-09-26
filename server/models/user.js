const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;

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
};
