import { Injectable } from "@angular/core";
// rxjs
import { switchMap, map, catchError } from "rxjs/operators";
import { Observable, of } from "rxjs";
// ngrx
import { Actions, Effect, ofType } from "@ngrx/effects";
// models
import { Profile } from "../models/profile.model";
// services
import { ProfileService } from "../services/profile.service";
// actions
import {
  ProfileError,
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

  // Helpers
  handleError() {
    return new ProfileError({ error: "Could not fetch the profile" });
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
            if (!res) return this.handleError();

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
}
