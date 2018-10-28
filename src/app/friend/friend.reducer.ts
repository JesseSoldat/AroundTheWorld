// actions
import { FriendActionTypes } from "./friend.actions";
import { AuthActionTypes } from "../auth/auth.actions";
// models
import { FriendRequest } from "../models/friend-request.model";
import { Profile } from "../models/profile.model";

export interface FriendState {
  friends: Profile[];
  friendRequests: FriendRequest[];
}

export const initialFriendState: FriendState = {
  friends: null,
  friendRequests: null
};

export function friendReducer(state = initialFriendState, action) {
  const { type, payload } = action;

  switch (type) {
    case AuthActionTypes.LogoutAction:
      return { friends: null, friendRequests: null };

    case FriendActionTypes.FriendRequestLoaded:
      return { ...state, friendRequests: [...payload.friendRequests] };

    case FriendActionTypes.FriendsLoaded:
      return { ...state, friends: [...payload.friends] };

    default:
      return { ...state };
  }
}
