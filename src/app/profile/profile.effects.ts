import { Injectable } from "@angular/core";
// rxjs
import { switchMap, map, catchError } from "rxjs/operators";
import { Observable, of } from "rxjs";
// ngrx
import { Actions, Effect, ofType } from "@ngrx/effects";
// models
import { HttpRes } from "../models/http-res.model";
// services
import { ProfileService } from "../services/profile.service";
// actions
import {
  ProfileError,
  ProfileRequested,
  ProfileLoaded,
  ProfileUpdateStarted,
  ProfileUpdateFinished,
  ProfileActionTypes
} from "./profile.actions";

@Injectable()
export class ProfileEffects {
  constructor(
    private action$: Actions,
    private profileService: ProfileService
  ) {}

  // Helpers
  handleError(error: string = null) {
    return new ProfileError({ error });
  }

  @Effect()
  profileRequested$: Observable<
    ProfileLoaded | ProfileError
  > = this.action$.pipe(
    ofType<ProfileRequested>(ProfileActionTypes.ProfileRequested),
    switchMap(action =>
      this.profileService.getProfile().pipe(
        map(
          (res: HttpRes) => {
            // any error will come back as null
            if (!res) return this.handleError("Could not fetch the profile");

            const { payload } = res;

            return new ProfileLoaded({ profile: payload.profile });
          },
          catchError(err => {
            return of(null);
          })
        )
      )
    )
  );

  @Effect()
  profileUpdateStarted$: Observable<
    ProfileUpdateFinished | ProfileError
  > = this.action$.pipe(
    ofType<ProfileUpdateStarted>(ProfileActionTypes.ProfileUpdateStarted),
    switchMap(action =>
      this.profileService.updateProfile(action.payload.profile).pipe(
        map(
          (res: HttpRes) => {
            console.log(res);

            if (!res) return this.handleError();

            const { payload } = res;

            return new ProfileUpdateFinished({ profile: payload.profile });
          },
          catchError(err => {
            return of(null);
          })
        )
      )
    )
  );
}
