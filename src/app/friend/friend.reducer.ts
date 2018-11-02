// actions
import { FriendActionTypes } from "./friend.actions";
import { AuthActionTypes } from "../auth/auth.actions";
// models
import { FriendRequest } from "../models/friend-request.model";
import { Profile } from "../models/profile.model";

export interface FriendState {
  overlay: boolean;
  spinner: boolean;
  error: string;
  friends: Profile[];
  friendRequests: FriendRequest[];
  friendRequestsDetails: Profile[];
}

export const initialFriendState: FriendState = {
  overlay: false,
  spinner: false,
  error: null,
  friends: null,
  friendRequests: null,
  friendRequestsDetails: null
};

// helpers
const sendFriendRequest = (
  prevFriendRequests: FriendRequest[],
  friendRequest: FriendRequest
): FriendRequest[] =>
  prevFriendRequests ? [...prevFriendRequests, friendRequest] : [friendRequest];

const acceptFriendRequest = (
  prevFriendRequests: FriendRequest[],
  friendRequestId: string
): FriendRequest[] => {
  if (!prevFriendRequests) return null;

  return prevFriendRequests.filter(request => request._id !== friendRequestId);
};

export function friendReducer(state = initialFriendState, action) {
  const { type, payload } = action;

  switch (type) {
    // clear all state
    case AuthActionTypes.LogoutAction:
      return {
        friends: null,
        friendRequests: null,
        friendRequestsDetails: null,
        error: null,
        spinner: false
      };

    // handle error
    case FriendActionTypes.FriendError:
      return { ...state, error: payload.error, spinner: false };

    // ----------- loading ---------------

    // get friend requests
    case FriendActionTypes.FriendRequestLoaded:
      return {
        ...state,
        friendRequests: [...payload.friendRequests]
      };

    // get friends
    case FriendActionTypes.FriendsLoaded:
      return { ...state, friends: [...payload.friends], error: null };

    // ------------ small spinner ------------------

    case FriendActionTypes.FriendRequestDetailsRequested:
      return { ...state, spinner: true };

    case FriendActionTypes.FriendRequestDetailsLoaded:
      return {
        ...state,
        spinner: false,
        friendRequestsDetails: [...payload.friendRequestDetails]
      };

    // TODO on close of the modal return to NULL

    // ----------- show overlay -----------

    // send friend request
    case FriendActionTypes.SendFriendRequestStarted:
    // accept friend request
    case FriendActionTypes.AcceptFriendRequestStarted:
      return { ...state, overlay: true };

    // -------------- hide overlay -----------------

    // send friend request
    case FriendActionTypes.SendFriendRequestFinished:
      return {
        ...state,
        overlay: false,
        friendRequests: sendFriendRequest(
          state.friendRequests,
          payload.friendRequest
        )
      };

    // accept friend request
    case FriendActionTypes.AcceptFriendRequestFinished:
      return {
        ...state,
        overlay: false,
        friends: [...payload.friends],
        friendRequests: acceptFriendRequest(
          state.friendRequests,
          payload.friendRequestId
        )
      };

    default:
      return { ...state };
  }
}
