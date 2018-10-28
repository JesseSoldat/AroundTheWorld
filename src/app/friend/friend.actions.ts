import { Action } from "@ngrx/store";

import { Profile } from "../models/profile.model";
import { FriendRequest } from "../models/friend-request.model";

export enum FriendActionTypes {
  FriendsRequested = "FriendsRequested",
  FriendsLoaded = "FriendsLoaded",
  FriendRequestRequested = "FriendRequestRequested",
  FriendRequestLoaded = "FriendRequestLoaded"
}
// Get Friends
export class FriendsRequested implements Action {
  readonly type = FriendActionTypes.FriendsRequested;
}

export class FriendsLoaded implements Action {
  readonly type = FriendActionTypes.FriendsLoaded;

  constructor(public payload: { friends: Profile[] }) {}
}
// Get Friend Requests
export class FriendRequestRequested implements Action {
  readonly type = FriendActionTypes.FriendRequestRequested;
}

export class FriendRequestLoaded implements Action {
  readonly type = FriendActionTypes.FriendRequestLoaded;

  constructor(public payload: { friendRequests: FriendRequest[] }) {}
}

export type FriendActions =
  | FriendsRequested
  | FriendsLoaded
  | FriendRequestRequested
  | FriendRequestLoaded;
