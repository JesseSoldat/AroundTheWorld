// actions
import { FriendActionTypes } from "./friend.actions";
import { AuthActionTypes } from "../auth/auth.actions";
// models
import { FriendRequest } from "../models/friend-request.model";
import { Profile } from "../models/profile.model";

export interface FriendState {
  error: string;
  friends: Profile[];
  friendRequests: FriendRequest[];
}

export const initialFriendState: FriendState = {
  error: null,
  friends: null,
  friendRequests: null
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

    // get friend requests
    case FriendActionTypes.FriendRequestLoaded:
      return {
        ...state,
        friendRequests: [...payload.friendRequests]
      };

    // get friends
    case FriendActionTypes.FriendsLoaded:
      return { ...state, friends: [...payload.friends], error: null };

    default:
      return { ...state };
  }
}
