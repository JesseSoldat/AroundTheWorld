import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProfileState } from "./profile.reducer";

export const selectProfileState = createFeatureSelector<ProfileState>(
  "profile"
);

export const selectProfile = createSelector(
  selectProfileState,
  profileState => profileState.profile
);
