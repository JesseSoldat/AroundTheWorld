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

    // send friend request
    case FriendActionTypes.SendFriendRequestStarted:
      return { ...state, overlay: true };

    case FriendActionTypes.SendFriendRequestFinished:
      return {
        ...state,
        overlay: false,
        friendRequests: updateFriendRequests(
          state.friendRequests,
          payload.friendRequest
        )
      };

    default:
      return { ...state };
  }
}
