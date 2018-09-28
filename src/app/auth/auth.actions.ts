import { Action } from "@ngrx/store";
import { User } from "../models/user.model";

export enum AuthActionTypes {
  LoginAction = "[Login Page] LoginAction",
  RegisterAction = "[Register Page] RegisterAction",
  LogoutAction = "[Navbar] LogoutAction"
}

export class Register implements Action {
  readonly type = AuthActionTypes.RegisterAction;

  constructor(public payload: { user: User; token }) {}
}

export class Login implements Action {
  readonly type = AuthActionTypes.LoginAction;

  constructor(public payload: { user: User; token }) {}
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LogoutAction;

  constructor(public payload: { user: null }) {}
}

export type AuthActions = Register | Login | Logout;
