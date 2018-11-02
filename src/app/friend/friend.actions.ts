import { Action } from "@ngrx/store";

import { Profile } from "../models/profile.model";
import { FriendRequest } from "../models/friend-request.model";

export enum FriendActionTypes {
  FriendError = "FriendError",
  // loading
  FriendsRequested = "FriendsRequested",
  FriendsLoaded = "FriendsLoaded",
  FriendRequestRequested = "FriendRequestRequested",
  FriendRequestLoaded = "FriendRequestLoaded",
  // small spinner
  FriendRequestDetailsRequested = "FriendRequestDetailsRequested",
  FriendRequestDetailsLoaded = "FriendRequestDetailsLoaded",
  // overlay
  SendFriendRequestStarted = "SendFriendRequestStarted",
  SendFriendRequestFinished = "SendFriendRequestFinished",
  AcceptFriendRequestStarted = "AcceptFriendRequestStarted",
  AcceptFriendRequestFinished = "AcceptFriendRequestFinished"
}

// ------------ loading ----------------

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

// ------------- small spinner ------------------
export class FriendRequestDetailsRequested implements Action {
  readonly type = FriendActionTypes.FriendRequestDetailsRequested;

  constructor(public payload: { friendRequestIds: string[] }) {}
}

export class FriendRequestDetailsLoaded implements Action {
  readonly type = FriendActionTypes.FriendRequestDetailsLoaded;

  constructor(public payload: { friendRequestDetails: Profile[] }) {}
}

// -------------- overlay ---------------------
// send friend request
export class SendFriendRequestStarted implements Action {
  readonly type = FriendActionTypes.SendFriendRequestStarted;

  constructor(public payload: { friendId: string; storyId: string }) {}
}

export class SendFriendRequestFinished implements Action {
  readonly type = FriendActionTypes.SendFriendRequestFinished;

  constructor(public payload: { friendRequest: FriendRequest }) {}
}

// accept friend request
export class AcceptFriendRequestStarted implements Action {
  readonly type = FriendActionTypes.AcceptFriendRequestStarted;

  constructor(public payload: { friendId: string }) {}
}

export class AcceptFriendRequestFinished implements Action {
  readonly type = FriendActionTypes.AcceptFriendRequestFinished;

  constructor(
    public payload: {
      friendRequestId: string;
      friends: Profile[];
    }
  ) {}
}

export type FriendActions =
  | FriendError
  | FriendsRequested
  | FriendsLoaded
  | FriendRequestRequested
  | FriendRequestLoaded
  | FriendRequestDetailsRequested
  | FriendRequestDetailsLoaded
  | SendFriendRequestStarted
  | SendFriendRequestFinished
  | AcceptFriendRequestStarted
  | AcceptFriendRequestFinished;
