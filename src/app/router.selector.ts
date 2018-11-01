import { createFeatureSelector } from "@ngrx/store";
import { RouterReducerState, AppState } from "./reducers";

export const selectRouterState = createFeatureSelector<
  AppState,
  RouterReducerState
>("router");
