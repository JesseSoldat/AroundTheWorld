// actions
import { FriendActionTypes } from "./friend.actions";
import { AuthActionTypes } from "../auth/auth.actions";
// models
import { FriendRequest } from "../models/friend-request.model";
import { Profile } from "../models/profile.model";

export interface FriendState {
  overlay: boolean;
  error: string;
  friends: Profile[];
  friendRequests: FriendRequest[];
}

export const initialFriendState: FriendState = {
  overlay: false,
  error: null,
  friends: null,
  friendRequests: null
};

// helpers
const updateFriendRequests = (prevFriendRequests, friendRequest) =>
  prevFriendRequests ? [...prevFriendRequests, friendRequest] : [friendRequest];

const acceptFriendRequest = (prevFriendRequests, friendRequestId) => {
  if (!prevFriendRequests) return null;

  return prevFriendRequests.filter(request => request._id !== friendRequestId);
};

export function friendReducer(state = initialFriendState, action) {
  const { type, payload } = action;

  switch (type) {
    // clear all state
    case AuthActionTypes.LogoutAction:
      return { friends: null, friendRequests: null, error: null };

    // handle error
    case FriendActionTypes.FriendError:
      return { ...state, error: payload.error };

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

    // ------------ overlay -----------------
    // show overlay

    // send friend request
    case FriendActionTypes.SendFriendRequestStarted:
    // accept friend request
    case FriendActionTypes.AcceptFriendRequestStarted:
      return { ...state, overlay: true };

    // hide overlay

    // send friend request
    case FriendActionTypes.SendFriendRequestFinished:
      return {
        ...state,
        overlay: false,
        friendRequests: updateFriendRequests(
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
        friendRequest: acceptFriendRequest(
          state.friendRequests,
          payload.friendRequestId
        )
      };

    default:
      return { ...state };
  }
}
