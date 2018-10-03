import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.reducer";

export const selectAuthState = createFeatureSelector<AuthState>("auth");

export const selectIsAuth = createSelector(
  selectAuthState,
  authState => authState.isAuth
);

export const selectUser = createSelector(
  selectAuthState,
  authState => authState.user
);

export const selectUserId = createSelector(selectUser, user => {
  if (!user) return null;
  return user._id;
});
