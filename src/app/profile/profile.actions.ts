import { Action } from "@ngrx/store";

import { Profile } from "../models/profile.model";

export enum ProfileActionTypes {
  ProfileRequested = "ProfileRequested",
  ProfileLoaded = "ProfileLoaded"
}

// Get Profile
export class ProfileRequested implements Action {
  readonly type = ProfileActionTypes.ProfileRequested;
}

export class ProfileLoaded implements Action {
  readonly type = ProfileActionTypes.ProfileLoaded;

  constructor(public payload: { profile: Profile }) {}
}

export type ProfileActions = ProfileRequested | ProfileLoaded;
