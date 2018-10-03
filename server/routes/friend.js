const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
// Models
const FriendRequest = require("../models/friend");
// Middleware
const isAuth = require("../middleware/isAuth");
// Utils
const { serverRes, getMsg, getErrMsg } = require("../utils/serverRes");

module.exports = app => {
  // Get all Friends Request Sent or Received
  app.get("/api/friend/requests/:userId", isAuth, async (req, res) => {
    const { userId } = req.params;

    try {
      const friendsRequest = await FriendRequest.find({
        $or: [{ requester: userId }, { recipient: userId }]
      });

      serverRes(res, 200, null, { friendsRequest });
    } catch (err) {
      console.log("Err: Get Friend Requests", err);
      const msg = getErrMsg("err", "fetch", "friend request");
      serverRes(res, 400, msg, null);
    }
  });
  // Send a Friends Request
  app.post("/api/friend/request", isAuth, async (req, res) => {
    const { userId, friendId } = req.body;
    try {
      const friendRequest = new FriendRequest({
        requester: userId,
        recipient: friendId,
        status: "requested"
      });

      friendRequest.save();

      const msg = getMsg("Your friend request has been sent.", "blue");

      serverRes(res, 200, msg, { friendRequest });
    } catch (err) {
      console.log("Err: Friend Request", err);
      const msg = getMsg(
        "There was an error while sending a friend request.",
        "color"
      );
      serverRes(res, 400, msg, null);
    }
  });
};
