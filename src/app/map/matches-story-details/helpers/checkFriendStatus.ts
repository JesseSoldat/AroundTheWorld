const checkFriendStatus = (
  userId,
  matchedUserId,
  friends = [],
  friendRequests = []
) => {
  console.log("userId", userId);
  console.log("matchedUserId", matchedUserId);
  console.log("friends", friends);
  console.log("friendRequests", friendRequests);

  let status = "unknown";

  // check if they are friends
  friends.forEach(friend => {
    if (matchedUserId === friend._id) {
      return (status = "isFriend");
    }
  });

  // check friend requests
  friendRequests.forEach(request => {
    const { requester, recipient } = request;
  });
};
