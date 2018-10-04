const mongoose = require("mongoose");
const { Schema } = mongoose;

const FriendRequestSchema = new Schema({
  requester: { type: Schema.Types.ObjectId, ref: "user", required: true },
  recipient: { type: Schema.Types.ObjectId, ref: "user", required: true },
  // requested | accepted | rejected
  status: { type: String }
});

const FriendRequest = mongoose.model("friendRequest", FriendRequestSchema);

module.exports = FriendRequest;
