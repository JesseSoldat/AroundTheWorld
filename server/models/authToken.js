const mongoose = require("mongoose");
const { Schema } = mongoose;

const AuthTokenSchema = new Schema(
  {
    // token belongs to a single user
    user: { type: Schema.Types.ObjectId, ref: "user" },
    // user can have many tokens
    tokens: [{ type: String, required: true }],
    // expires in 7 days 604800 = seconds from now
    createdAt: { type: Date, default: Date.now(), expires: 604800 }
  },
  { timestamps: true }
);

const AuthToken = mongoose.model("authToken", AuthTokenSchema);

module.exports = AuthToken;
