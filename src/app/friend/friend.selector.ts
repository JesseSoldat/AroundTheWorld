import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from "@ngrx/store";
// models
import { FriendState } from "./friend.reducer";
import { AppState } from "../reducers";
import { FriendRequest } from "../models/friend-request.model";
// selectors
import { selectUserId } from "../auth/auth.selectors";

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

// check if matched user is `my` friend
export const selectIsMyFriend = (matchedUserId: string) => {
  return createSelector(
    selectFriends,
    (friends): string => {
      if (!friends) return null;

      const index = friends.findIndex(friend => friend._id === matchedUserId);

      return index >= 0 ? "isFriend" : "isNotFriend";
    }
  );
};

// --------- friend requests -----------

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
export const selectReceivedFriendRequest = userId => {
  return createSelector(
    selectFriendRequests,
    (friendRequests): FriendRequest[] => {
      if (!userId || !friendRequests) return null;

      return friendRequests.filter(obj => obj.recipient._id === userId);
    }
  );
};

// check for received request by matching user
export const selectReceivedRequestByMatchingUser = (matchedUserId: string) => {
  return createSelector(
    selectUserId,
    selectFriendRequests,
    (userId, friendRequests): string => {
      if (!friendRequests) return null;

      const request = friendRequests.find(
        obj =>
          obj.recipient._id === userId && obj.requester._id === matchedUserId
      );
      // status not requested if the request has not been made yet
      return request ? "receivedRequest" : "didNotReceiveRequest";
    }
  );
};

// check if I sent a request to this persons or not
export const selectSentFriendRequestToMatchingUser = (
  matchedUserId: string
) => {
  return createSelector(
    selectFriendRequests,
    (friendRequests): string => {
      if (!friendRequests) return null;

      const request = friendRequests.find(
        obj => obj.recipient._id === matchedUserId
      );
      // status not requested if the request has not been made yet
      return request ? "sentRequest" : "didNotSendRequest";
    }
  );
};

// ------------ friend status ----------------

// check for friends, received request, and sent request | return 'status'
export const selectMatchedUserStatus = (matchedUserId: string) => {
  return createSelector(
    selectIsMyFriend(matchedUserId),
    selectReceivedRequestByMatchingUser(matchedUserId),
    selectSentFriendRequestToMatchingUser(matchedUserId),
    (
      isFriend,
      receivedRequestFromMatchingUser,
      sentFriendRequestToMatchingUser
    ): string => {
      // ----------- logging -------------
      // if (isFriend) console.log("isFriend", isFriend);
      // if (receivedRequestFromMatchingUser)
      //   console.log(
      //     "receivedRequestFromMatchingUser",
      //     receivedRequestFromMatchingUser
      //   );
      // if (sentFriendRequestToMatchingUser)
      //   console.log(
      //     "sentFriendRequestToMatchingUser",
      //     sentFriendRequestToMatchingUser
      //   );
      // console.log("update");

      if (isFriend === "isFriend") return isFriend;

      // check if friend & friendRequest status is available
      if (
        isFriend &&
        receivedRequestFromMatchingUser &&
        sentFriendRequestToMatchingUser
      ) {
        if (receivedRequestFromMatchingUser === "receivedRequest")
          return "receivedRequest";
        else if (sentFriendRequestToMatchingUser === "sentRequest")
          return "sentRequest";
        // all api data is available
        else return "notRequested";
      }

      return "statusLoading";
    }
  );
};
