import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from "@ngrx/store";
import { FriendState } from "./friend.reducer";
import { selectUserId } from "../auth/auth.selectors";
import { AppState } from "../reducers";
import { FriendRequest } from "../models/friend-request.model";

export const selectFriendState = createFeatureSelector<FriendState>("friend");

// errors
export const selectError = createSelector(
  selectFriendState,
  friendState => friendState.error
);

// get all of `my` friends
export const selectFriends = createSelector(
  selectFriendState,
  friendState => friendState.friends
);

// get all of the friend requests
export const selectFriendRequests = createSelector(
  selectFriendState,
  friendState => {
    // This selector is called from another module so if will be undefined at first because of lazy loading
    if (!friendState) return null;
    return friendState.friendRequests;
  }
);

// check if `I` have received any friends request
export const selectReceivedFriendRequest = (
  userId
): MemoizedSelector<AppState, FriendRequest[]> => {
  return createSelector(
    selectFriendRequests,
    (friendRequests): FriendRequest[] => {
      if (!userId || !friendRequests) return null;

      const friendRequest = friendRequests.filter(
        obj => obj.recipient._id === userId
      );
      return friendRequest.length ? friendRequest : null;
    }
  );
};

// check for received request by matching user
export const selectReceivedRequestByMatchingUser = (
  matchedUserId: string,
  userId: string
): MemoizedSelector<AppState, FriendRequest> => {
  return createSelector(
    selectFriendRequests,
    (friendRequests): FriendRequest => {
      if (!friendRequests) return null;

      const request = friendRequests.find(
        obj =>
          obj.recipient._id === userId && obj.requester._id === matchedUserId
      );
      // status not requested if the request has not been made yet
      return request ? request : null;
    }
  );
};

// check if I sent a request to this persons or not
export const selectSentFriendRequest = (
  matchedUserId: string
): MemoizedSelector<AppState, FriendRequest> => {
  return createSelector(
    selectFriendRequests,
    (friendRequests): FriendRequest => {
      if (!friendRequests) return null;

      const request = friendRequests.find(
        obj => obj.recipient._id === matchedUserId
      );
      // status not requested if the request has not been made yet
      return request ? request : null;
    }
  );
};
