import { createFeatureSelector } from "@ngrx/store";
import { RouterReducerState, AppState } from "./reducers";

export const routerState = createFeatureSelector<AppState, RouterReducerState>(
  "router"
);
