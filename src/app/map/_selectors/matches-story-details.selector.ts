import { createSelector } from "@ngrx/store";
import { selectRouterState } from "../../router.selector";
import { selectUserId } from "../../auth/auth.selectors";
import {
  selectFriends,
  selectFriendRequests
} from "../../friend/friend.selector";

// ------------ router -----------------
//"matches/storyDetails/:matchedUserId/:storyId"
export const selectMatchesStoryDetailsUserId = createSelector(
  selectRouterState,
  (state: any) => {
    if (!state) return null;

    return (
      state &&
      state.state &&
      state.state.params &&
      state.state.params.matchedUserId
    );
  }
);

//"matches/storyDetails/:matchedUserId/:storyId"
export const selectMatchesStoryDetailsStoryId = createSelector(
  selectRouterState,
  (state: any) => {
    if (!state) return null;

    return (
      state && state.state && state.state.params && state.state.params.storyId
    );
  }
);

// friend
export const selectIsMyFriend = createSelector(
  selectMatchesStoryDetailsUserId,
  selectFriends,
  (matchedUserId, friends): string => {
    if (!friends) return null;

    const index = friends.findIndex(friend => friend._id === matchedUserId);

    return index >= 0 ? "isFriend" : "isNotFriend";
  }
);

export const selectReceivedRequestByMatchingUser = createSelector(
  selectMatchesStoryDetailsUserId,
  selectUserId,
  selectFriendRequests,
  (matchedUserId, userId, friendRequests): String => {
    if (!matchedUserId || !userId || !friendRequests) return null;

    const request = friendRequests.find(
      obj => obj.recipient._id === userId && obj.requester._id === matchedUserId
    );
    // status not requested if the request has not been made yet
    return request ? request.status : "didNotReceiveRequest";
  }
);

// check if I sent a request to this persons or not
export const selectSentFriendRequestToMatchingUser = createSelector(
  selectMatchesStoryDetailsUserId,
  selectFriendRequests,
  (matchedUserId, friendRequests): String => {
    if (!friendRequests) return null;

    let request = friendRequests.find(
      obj => obj.recipient._id === matchedUserId
    );

    // when friend request has just been create
    if (!request)
      request = friendRequests.find(obj => obj.recipient === matchedUserId);

    // status not requested if the request has not been made yet
    return request ? request.status : "didNotSendRequest";
  }
);

// ------------ friend status ----------------

// check for friends, received request, and sent request | return 'status'
export const selectMatchedUserStatus = createSelector(
  selectIsMyFriend,
  selectReceivedRequestByMatchingUser,
  selectSentFriendRequestToMatchingUser,
  (
    isFriend,
    receivedRequestFromMatchingUser,
    sentFriendRequestToMatchingUser
  ): string => {
    if (isFriend === "isFriend") return isFriend;

    // check if friend & friendRequest status is available
    if (
      isFriend &&
      receivedRequestFromMatchingUser &&
      sentFriendRequestToMatchingUser
    ) {
      if (receivedRequestFromMatchingUser === "requested")
        return "receivedRequest";
      else if (sentFriendRequestToMatchingUser === "requested")
        return "sentRequest";
      // all api data is available
      else return "notRequested";
    }

    return "statusLoading";
  }
);
