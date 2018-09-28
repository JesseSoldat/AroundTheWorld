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

const localSaveErr = "Could not save the user or token to local storage.";
const localGetErr = "Could not get the user or token from local storage.";
const localDeleteErr = "Could not remove the user or token from local storage.";

@Injectable()
export class AuthEffects {
  constructor(private action$: Actions, private router: Router) {}

  nav(path): void {
    this.router.navigateByUrl(`/${path}`);
  }

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
      const token = JSON.parse(localStorage.getItem("token"));
      return { user, token };
    } catch (err) {
      console.log(localGetErr);
      return { user: null, token: null };
    }
  }

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
      if (user && token) return of(new Login({ user, token }));

      return of(new Logout({ user: null }));
    } catch (err) {
      return of(new Logout({ user: null }));
    }
  });
}
