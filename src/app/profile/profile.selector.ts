import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProfileState } from "./profile.reducer";

export const selectProfileState = createFeatureSelector<ProfileState>(
  "profile"
);

// overlay
export const selectOverlay = createSelector(
  selectProfileState,
  profileState => profileState.overlay
);

export const selectError = createSelector(
  selectProfileState,
  profileState => profileState.error
);

export const selectProfile = createSelector(
  selectProfileState,
  profileState => profileState.profile
);
