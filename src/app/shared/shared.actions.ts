import { Action } from "@ngrx/store";
// Models
import { Msg } from "../models/msg.model";

export enum SharedActionTypes {
  ShowMsg = "ShowMsg"
}

export class ShowMsg implements Action {
  readonly type = SharedActionTypes.ShowMsg;

  constructor(public payload: { msg: Msg }) {}
}
