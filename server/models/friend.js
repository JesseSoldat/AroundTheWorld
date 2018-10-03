const mongoose = require("mongoose");
const { Schema } = mongoose;

const FriendRequestSchema = new Schema({
  requester: { type: String, required: true },
  recipient: { type: String, required: true },
  // requested | accepted | rejected
  status: { type: String }
});

const FriendRequest = mongoose.model("friendRequest", FriendRequestSchema);

module.exports = FriendRequest;
