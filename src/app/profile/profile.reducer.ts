// actions
import { ProfileActionTypes } from "./profile.actions";
import { AuthActionTypes } from "../auth/auth.actions";
// models
import { Profile } from "../models/profile.model";

export interface ProfileState {
  error: string;
  profile: Profile;
}

export const initialProfileState: ProfileState = {
  error: null,
  profile: null
};

export function profileReducer(state = initialProfileState, action) {
  const { type, payload } = action;

  switch (type) {
    // clear all state
    case AuthActionTypes.LogoutAction:
      return { profile: null, error: null };

    // handle error
    case ProfileActionTypes.ProfileError:
      return { ...state, error: payload.error };

    // fetch user profile
    case ProfileActionTypes.ProfileLoaded:
      return { ...state, profile: payload.profile, error: null };

    default:
      return { ...state };
  }
}
