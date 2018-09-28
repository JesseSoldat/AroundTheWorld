import { SharedActionTypes } from "./shared.actions";
import { AuthActionTypes } from "../auth/auth.actions";
// Models
import { Msg } from "../models/msg.model";

export interface SharedState {
  msg: Msg;
}

export const initialSharedState: SharedState = {
  msg: null
};

export function sharedReducer(state = initialSharedState, action) {
  const { type, payload } = action;

  switch (type) {
    case SharedActionTypes.ShowMsg:
      return {
        ...state,
        msg: payload.msg
      };

    case AuthActionTypes.LogoutAction:
      return {
        state: initialSharedState
      };

    default:
      return { ...state };
  }
}
