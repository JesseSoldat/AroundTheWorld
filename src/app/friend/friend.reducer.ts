import { FriendActionTypes } from "./friend.actions";

import { FriendRequest } from "../models/friend-request.model";

export interface FriendState {
  friends: String[];
  friendRequests: FriendRequest[];
}

export const initialFriendState: FriendState = {
  friends: null,
  friendRequests: null
};

export function friendReducer(state = initialFriendState, action) {
  const { type, payload } = action;

  switch (type) {
    case FriendActionTypes.FriendRequestLoaded:
      return { ...state, friendRequests: [...payload.friendRequests] };

    case FriendActionTypes.FriendsLoaded:
      return { ...state, friends: [...payload.friends] };

    default:
      return { ...state };
  }
}
