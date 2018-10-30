import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FriendState } from "./friend.reducer";
import { selectUserId } from "../auth/auth.selectors";

export const selectFriendState = createFeatureSelector<FriendState>("friend");

// errors
export const selectError = createSelector(
  selectFriendState,
  friendState => friendState.error
);

// friends
export const selectFriends = createSelector(
  selectFriendState,
  friendState => friendState.friends
);

// my friend request
export const selectFriendRequests = createSelector(
  selectFriendState,
  friendState => {
    // This selector is called from another module so if will be undefined at first because of lazy loading
    if (friendState === undefined) return null;
    return friendState.friendRequests;
  }
);

// check for received request by matching user
export const selectReceivedRequestByMatchingUser = (
  matchedUserId: string,
  userId: string
) => {
  return createSelector(selectFriendRequests, friendRequests => {
    if (friendRequests === null) return null;
    const request = friendRequests.find(
      obj => obj.recipient._id === userId && obj.requester._id === matchedUserId
    );
    // status not requested if the request has not been made yet
    return request ? request : { status: "notRequested" };
  });
};

// check if I sent a request to this persons or not
export const selectSentFriendRequest = (matchedUserId: string) => {
  return createSelector(selectFriendRequests, friendRequests => {
    if (friendRequests === null) return null;
    const request = friendRequests.find(
      obj => obj.recipient._id === matchedUserId
    );
    // status not requested if the request has not been made yet
    return request ? request : { status: "notRequested" };
  });
};

// check if I have any friends request
export const selectReceivedFriendRequest = userId => {
  return createSelector(selectFriendRequests, friendRequests => {
    if (userId === null || friendRequests === null) return null;
    const friendRequest = friendRequests.filter(
      obj => obj.recipient._id === userId
    );
    return friendRequest.length ? friendRequest : null;
  });
};
