import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from "@ngrx/store";
// models
import { FriendState } from "./friend.reducer";
import { FriendRequest } from "../models/friend-request.model";

export const selectFriendState = createFeatureSelector<FriendState>("friend");

// errors
export const selectError = createSelector(
  selectFriendState,
  friendState => friendState.error
);

// overlay
export const selectFriendOverlay = createSelector(
  selectFriendState,
  friendState => friendState.overlay
);

// --------- friends --------------

// get all of `my` friends
export const selectFriends = createSelector(
  selectFriendState,
  friendState => friendState.friends
);

// --------- friend requests -----------

// get all of the friend requests
export const selectFriendRequests = createSelector(
  selectFriendState,
  friendState => {
    if (!friendState) return null;
    return friendState.friendRequests;
  }
);

// get all friend request details
export const selectFriendRequestsDetails = createSelector(
  selectFriendState,
  friendState => {
    if (!friendState) return null;
    return friendState.friendRequestsDetails;
  }
);

// check if `I` have received any friends request
export const selectReceivedFriendRequest = userId => {
  return createSelector(
    selectFriendRequests,
    (friendRequests): FriendRequest[] => {
      if (!userId || !friendRequests) return null;

      return friendRequests.filter(obj => obj.recipient._id === userId);
    }
  );
};
