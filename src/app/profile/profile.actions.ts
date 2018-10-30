import { Action } from "@ngrx/store";

import { Profile } from "../models/profile.model";

export enum ProfileActionTypes {
  ProfileError = "ProfileError",
  ProfileRequested = "ProfileRequested",
  ProfileLoaded = "ProfileLoaded",
  ProfileUpdateStarted = "ProfileUpdateStarted",
  ProfileUpdateFinished = "ProfileUpdateFinished",
  AvatarUpdateStarted = "AvatarUpdateStarted",
  AvatarUpdateFinished = "AvatarUpdateFinished",
  PasswordUpdateStarted = "PasswordUpdateStarted",
  PasswordUpdateFinished = "PasswordUpdateFinished"
}

// handle all profile errors
export class ProfileError implements Action {
  readonly type = ProfileActionTypes.ProfileError;

  constructor(public payload: { error: string }) {}
}

// get profile
export class ProfileRequested implements Action {
  readonly type = ProfileActionTypes.ProfileRequested;
}

export class ProfileLoaded implements Action {
  readonly type = ProfileActionTypes.ProfileLoaded;

  constructor(public payload: { profile: Profile }) {}
}

// update profile
export class ProfileUpdateStarted implements Action {
  readonly type = ProfileActionTypes.ProfileUpdateStarted;

  constructor(public payload: { profile: Profile }) {}
}

export class ProfileUpdateFinished implements Action {
  readonly type = ProfileActionTypes.ProfileUpdateFinished;

  constructor(public payload: { profile: Profile }) {}
}

// update avatar
export class AvatarUpdateStarted implements Action {
  readonly type = ProfileActionTypes.AvatarUpdateStarted;
}

export class AvatarUpdateFinished implements Action {
  readonly type = ProfileActionTypes.AvatarUpdateFinished;

  constructor(public payload: { profile: Profile }) {}
}

// update password
export class PasswordUpdateStarted implements Action {
  readonly type = ProfileActionTypes.PasswordUpdateStarted;
}

export class PasswordUpdateFinished implements Action {
  readonly type = ProfileActionTypes.PasswordUpdateFinished;
}

export type ProfileActions =
  | ProfileError
  | ProfileRequested
  | ProfileLoaded
  | ProfileUpdateStarted
  | ProfileUpdateFinished
  | AvatarUpdateStarted
  | AvatarUpdateFinished
  | PasswordUpdateStarted
  | PasswordUpdateFinished;
