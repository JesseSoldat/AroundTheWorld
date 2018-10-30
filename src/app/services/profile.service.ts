import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
// rxjs
import { tap, catchError } from "rxjs/operators";
import { Observable, of } from "rxjs";
// ngrx
import { Store, select } from "@ngrx/store";
import { AppState } from "../reducers";
import { selectUserId } from "../auth/auth.selectors";
import { AvatarUpdateFinished } from "../profile/profile.actions";
// models
import { HttpRes } from "../models/http-res.model";
import { Profile } from "../models/profile.model";
// services
import { HttpService } from "./http.service";

@Injectable({
  providedIn: "root"
})
export class ProfileService {
  userId: string;

  constructor(
    private httpService: HttpService,
    private store: Store<AppState>,
    private toastr: ToastrService
  ) {
    this.getUserId();
  }

  // helpers
  handleError(err) {
    console.error("friend service handleError:", err.error);

    this.toastr.error("", err.error.msg, {
      timeOut: 3000,
      positionClass: "toast-bottom-right"
    });

    return of(null);
  }

  handleSuccess(msg) {
    this.toastr.success("", msg, {
      timeOut: 3000,
      positionClass: "toast-bottom-right"
    });
  }

  getUserId() {
    this.store
      .pipe(
        select(selectUserId),
        tap((userId: string) => (this.userId = userId))
      )
      .subscribe();
  }

  //--------------  api calls -------------------
  // get profile
  getProfile(): Observable<HttpRes> {
    if (!this.userId) return of(null);

    return this.httpService.httpGetRequest(`profile/${this.userId}`).pipe(
      tap((profile: Profile) => {}),
      catchError(err => this.handleError(err))
    );
  }

  // update profile
  updateProfile(profile: Profile): Observable<HttpRes> {
    if (!this.userId) return of(null);

    return this.httpService
      .httpPatchRequest(`profile/${this.userId}`, { profile })
      .pipe(
        tap((res: HttpRes) => {
          this.handleSuccess(res.msg);
        }),
        catchError(err => this.handleError(err))
      );
  }

  // update avatar
  updateAvatar(avatar: string): Observable<HttpRes> {
    if (!this.userId) return of(null);

    return this.httpService
      .httpPatchRequest(`profile/${this.userId}`, { profile: { avatar } })
      .pipe(
        tap((res: HttpRes) => {
          console.log("updateAvatar", res);

          this.handleSuccess(res.msg);
          this.store.dispatch(
            new AvatarUpdateFinished({ profile: res.payload.profile })
          );
        }),
        catchError(err => this.handleError(err))
      );
  }
}
