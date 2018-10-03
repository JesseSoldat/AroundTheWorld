import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FriendState } from "./friend.reducer";

export const selectFriendState = createFeatureSelector<FriendState>("friend");

// My Friend Request
export const selectFriendRequests = createSelector(
  selectFriendState,
  friendState => {
    // This selector is called from another module so if will be undefined at first because of lazy loading
    if (friendState === undefined) return null;
    return friendState.friendRequests;
  }
);

// Check if I sent a request to this persons or not
export const selectSentFriendRequest = (personId: string) => {
  return createSelector(selectFriendRequests, friendRequests => {
    if (friendRequests === null) return null;
    const request = friendRequests.find(obj => obj.recipient === personId);
    // status notRequested if the request has not been made yet
    return request ? request : { status: "notRequested" };
  });
};
