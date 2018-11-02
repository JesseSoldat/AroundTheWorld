// models
const User = require("../models/user");
const FriendRequest = require("../models/friend");
// middleware
const isAuth = require("../middleware/isAuth");
const isUser = require("../middleware/isUser");
// utils
const { serverRes, getErrMsg } = require("../utils/serverRes");
// queries
const friendProfile = {
  path: "friends",
  select: [
    "username",
    "avatar",
    "email",
    "gender",
    "hometown",
    "birthDate",
    "about",
    "occupation"
  ]
};

module.exports = app => {
  // get all friends
  app.get("/api/friends/:userId", isAuth, isUser, async (req, res) => {
    try {
      const { userId } = req.params;

      const friends = await User.findById(userId, { _id: 1 }).populate(
        friendProfile
      );

      serverRes(res, 200, null, { friends: friends.friends });
    } catch (err) {
      console.log("Err: Get Friends", err);
      const msg = getErrMsg("err", "fetch", "friends");
      serverRes(res, 400, msg, null);
    }
  });

  // get all friends request sent or received
  app.get("/api/friend/requests/:userId", isAuth, isUser, async (req, res) => {
    try {
      const { userId } = req.params;

      const friendsRequest = await FriendRequest.find({
        $or: [{ requester: userId }, { recipient: userId }]
      })
        .populate({
          path: "recipient",
          select: ["username"]
        })
        .populate({
          path: "requester",
          select: ["username"]
        });

      serverRes(res, 200, null, { friendsRequest });
    } catch (err) {
      console.log("Err: Get Friend Requests", err);
      const msg = getErrMsg("err", "fetch", "friend request");
      serverRes(res, 400, msg, null);
    }
  });

  // get all friend request details from array of ids
  app.post(
    "/api/friend/requests/details/:userId",
    isAuth,
    isUser,
    async (req, res) => {
      try {
        const { friendRequestIds } = req.body;

        const friendRequestDetails = await User.find({
          _id: { $in: friendRequestIds }
        }).populate(friendProfile);

        serverRes(res, 200, null, { friendRequestDetails });
      } catch (err) {
        console.log("Err: Get Friend Requests Details", err);
        const msg = getErrMsg("err", "fetch", "friend request details");
        serverRes(res, 400, msg, null);
      }
    }
  );

  // send a friends request
  app.post("/api/friend/request/:userId", isAuth, isUser, async (req, res) => {
    try {
      const { userId } = req.params;
      const { friendId } = req.body;

      const friendRequest = new FriendRequest({
        requester: userId,
        recipient: friendId,
        status: "requested"
      });

      friendRequest.save();

      const msg = "Your friend request has been sent.";

      serverRes(res, 200, msg, { friendRequest });
    } catch (err) {
      console.log("Err: Friend Request", err);
      const msg = "There was an error while sending a friend request.";
      serverRes(res, 400, msg, null);
    }
  });

  // accept a friend request
  app.post(
    "/api/friend/request/accept/:userId",
    isAuth,
    isUser,
    async (req, res) => {
      const msg = "There was an error while accepting a friend request.";
      try {
        const { userId } = req.params;
        const { friendId } = req.body;

        // find the friend request
        const friendRequest = await FriendRequest.findOne({
          requester: friendId,
          recipient: userId
        });

        // save the id before deleting the friend request
        const friendRequestId = friendRequest._id;

        if (!friendRequest) return serverRes(res, 400, msg, null);

        // change status to friend for the user and the requester
        // delete the friend request
        const [user, requester] = await Promise.all([
          User.findByIdAndUpdate(
            userId,
            { $addToSet: { friends: friendId } },
            { new: true }
          ).populate(friendProfile),
          User.findByIdAndUpdate(
            friendId,
            { $addToSet: { friends: userId } },
            { new: true }
          ),
          FriendRequest.findByIdAndRemove(friendRequest._id)
        ]);

        const msg = "You have accepted the friend request.";

        serverRes(res, 200, msg, {
          friends: user.friends,
          friendRequestId
        });
      } catch (err) {
        console.log("Err: Accept Friend Request", err);
        serverRes(res, 400, msg, null);
      }
    }
  );
};
