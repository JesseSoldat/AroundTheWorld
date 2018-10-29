import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
// rxjs
import { tap, switchMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";
// ngrx
import { Actions, Effect, ofType } from "@ngrx/effects";
// models
import { Profile } from "../models/profile.model";
// services
import { ProfileService } from "../services/profile.service";
// actions
import {
  ProfileRequested,
  ProfileLoaded,
  ProfileActionTypes
} from "./profile.actions";
import { HttpRes } from "../models/http-res.model";

@Injectable()
export class ProfileEffects {
  constructor(
    private action$: Actions,
    private profileService: ProfileService
  ) {}

  @Effect()
  profileRequested$ = this.action$.pipe(
    ofType<ProfileRequested>(ProfileActionTypes.ProfileRequested),
    switchMap(action =>
      this.profileService.getProfile().pipe(
        map(
          (res: HttpRes) => {
            const { payload } = res;

            return new ProfileLoaded({ profile: payload.profile });
          },
          catchError(err => {
            console.log("effect: profileRequested$", err);
            return of(null);
          })
        )
      )
    )
  );
}
