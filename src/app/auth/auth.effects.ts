import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
// Rxjs
import { tap } from "rxjs/operators";
import { of, defer } from "rxjs";
// Ngrx
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Register, Login, Logout, AuthActionTypes } from "./auth.actions";
// Models
import { User } from "../models/user.model";
// Utils
import { checkTokenExpiration } from "../utils/auth/checkTokenExpiration";

const localSaveErr = "Could not save the user or token to local storage.";
const localGetErr = "Could not get the user or token from local storage.";
const localDeleteErr = "Could not remove the user or token from local storage.";

@Injectable()
export class AuthEffects {
  constructor(private action$: Actions, private router: Router) {}

  // Helpers
  nav(path): void {
    this.router.navigateByUrl(`/${path}`);
  }

  // Token and Local Storage
  setTokenAndUserToLS(payload): void {
    try {
      localStorage.setItem("user", JSON.stringify(payload.user));
      localStorage.setItem("token", payload.token);
      this.nav("dashboard");
    } catch (err) {
      console.log(localSaveErr);
      this.nav("dashboard");
    }
  }

  getTokenAndUserFromLS() {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");
      return { user, token };
    } catch (err) {
      console.log(localGetErr);
      return { user: null, token: null };
    }
  }

  // Effects

  @Effect({ dispatch: false })
  register$ = this.action$.pipe(
    ofType<Register>(AuthActionTypes.RegisterAction),
    tap(action => this.setTokenAndUserToLS(action.payload))
  );

  @Effect({ dispatch: false })
  login$ = this.action$.pipe(
    ofType<Login>(AuthActionTypes.LoginAction),
    tap(action => this.setTokenAndUserToLS(action.payload))
  );

  @Effect({ dispatch: false })
  logout$ = this.action$.pipe(
    ofType<Logout>(AuthActionTypes.LogoutAction),
    tap(action => {
      try {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        this.nav("login");
      } catch (err) {
        this.nav("login");
        console.log(localDeleteErr);
      }
    })
  );

  @Effect()
  init$ = defer(() => {
    try {
      const { user, token } = this.getTokenAndUserFromLS();

      const isTokenExpired = checkTokenExpiration(token);

      // Token is Expired Logout
      if (isTokenExpired) return of(new Logout({ user: null }));

      // We have the User and Token Login
      if (user && token) return of(new Login({ user, token }));

      // No User || Token Logout
      return of(new Logout({ user: null }));
    } catch (err) {
      // General Error Logout
      return of(new Logout({ user: null }));
    }
  });
}
