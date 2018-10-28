// actions
import { ProfileActionTypes } from "./profile.actions";
import { AuthActionTypes } from "../auth/auth.actions";
// models
import { Profile } from "../models/profile.model";

export interface ProfileState {
  profile: Profile;
}

export const initialProfileState: ProfileState = {
  profile: null
};

export function profileReducer(state = initialProfileState, action) {
  const { type, payload } = action;

  switch (type) {
    case AuthActionTypes.LogoutAction:
      return { profile: null };

    case ProfileActionTypes.ProfileLoaded:
      return { profile: { ...payload.profile } };

    default:
      return { ...state };
  }
}
