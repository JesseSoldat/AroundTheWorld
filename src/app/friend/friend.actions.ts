import { Action } from "@ngrx/store";

import { Profile } from "../models/profile.model";
import { FriendRequest } from "../models/friend-request.model";

export enum FriendActionTypes {
  FriendError = "FriendError",
  FriendsRequested = "FriendsRequested",
  FriendsLoaded = "FriendsLoaded",
  FriendRequestRequested = "FriendRequestRequested",
  FriendRequestLoaded = "FriendRequestLoaded"
}

// handle all profile errors
export class FriendError implements Action {
  readonly type = FriendActionTypes.FriendError;

  constructor(public payload: { error: string }) {}
}

// get friends
export class FriendsRequested implements Action {
  readonly type = FriendActionTypes.FriendsRequested;
}

export class FriendsLoaded implements Action {
  readonly type = FriendActionTypes.FriendsLoaded;

  constructor(public payload: { friends: Profile[] }) {}
}
// get friend requests
export class FriendRequestRequested implements Action {
  readonly type = FriendActionTypes.FriendRequestRequested;
}

export class FriendRequestLoaded implements Action {
  readonly type = FriendActionTypes.FriendRequestLoaded;

  constructor(public payload: { friendRequests: FriendRequest[] }) {}
}

export type FriendActions =
  | FriendError
  | FriendsRequested
  | FriendsLoaded
  | FriendRequestRequested
  | FriendRequestLoaded;
