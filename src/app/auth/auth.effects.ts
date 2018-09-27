import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
// Rxjs
import { tap } from "rxjs/operators";
// Ngrx
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Register, AuthActionTypes } from "./auth.actions";

const localSave = "Could not save the user to local storage.";
const localDelete = "Could not remove the user from local storage.";

@Injectable()
export class AuthEffects {
  constructor(private action$: Actions, private router: Router) {}

  nav(path) {
    this.router.navigateByUrl(`/${path}`);
  }

  @Effect({ dispatch: false })
  register$ = this.action$.pipe(
    ofType<Register>(AuthActionTypes.RegisterAction),
    tap(action => {
      try {
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        this.nav("dashboard");
      } catch (err) {
        console.log(localSave);
        this.nav("dashboard");
      }
    })
  );
}
