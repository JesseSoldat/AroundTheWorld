import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SharedState } from "./shared.reducer";
// Models
import { Msg } from "../models/msg.model";
import { UiMsg } from "../models/ui-msg.model";

const titleEnum = {
  green: "Success: ",
  blue: "Info: ",
  red: "Error: "
};

const colorEnum = {
  green: "alert-success",
  blue: "alert-info",
  red: "alert-danger"
};

export const selectSharedState = createFeatureSelector<SharedState>("shared");

// Message
const formatMsg = (msg: Msg) => {
  if (!msg) return null;

  const uiMsg: UiMsg = {
    title: titleEnum[msg.color],
    info: msg.info,
    color: colorEnum[msg.color]
  };

  return uiMsg;
};

export const selectMsg = createSelector(selectSharedState, sharedState =>
  formatMsg(sharedState.msg)
);
