// actions
import { ProfileActionTypes } from "./profile.actions";
import { AuthActionTypes } from "../auth/auth.actions";
// models
import { Profile } from "../models/profile.model";

export interface ProfileState {
  overlay: boolean;
  error: string;
  profile: Profile;
}

export const initialProfileState: ProfileState = {
  overlay: false,
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

    // -------- loading ------------

    // fetch user profile
    case ProfileActionTypes.ProfileLoaded:
      return { ...state, profile: payload.profile, error: null };

    // -------- overlay ------------

    case ProfileActionTypes.ProfileUpdateStarted:
    case ProfileActionTypes.AvatarUpdateStarted:
    case ProfileActionTypes.PasswordUpdateStarted:
      return { ...state, overlay: true, error: null };

    case ProfileActionTypes.ProfileUpdateFinished:
    case ProfileActionTypes.AvatarUpdateFinished:
      return {
        ...state,
        overlay: false,
        profile: payload.profile,
        error: null
      };

    case ProfileActionTypes.PasswordUpdateFinished:
      return {
        ...state,
        overlay: false,
        error: null
      };

    default:
      return { ...state };
  }
}
