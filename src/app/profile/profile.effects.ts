import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
// rxjs
import { tap, switchMap, map, catchError } from "rxjs/operators";
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
    private profileService: ProfileService,
    private toastr: ToastrService
  ) {}

  // Helpers
  handleError(err) {
    console.error("profile effects handleError:", err);

    this.toastr.error("", err.error.msg, {
      timeOut: 3000,
      positionClass: "toast-bottom-right"
    });

    return of({ msg: err.error.msg, payload: null });
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
            if (!res)
              return new ProfileError({ error: "Could not fetch the profile" });

            const { payload } = res;

            return new ProfileLoaded({ profile: payload.profile });
          },
          catchError(err => {
            this.handleError(err);
            return of(null);
          })
        )
      )
    )
  );
}
