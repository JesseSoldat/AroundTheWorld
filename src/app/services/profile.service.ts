import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
// rxjs
import { tap, catchError } from "rxjs/operators";
import { Observable, of } from "rxjs";
// ngrx
import { Store, select } from "@ngrx/store";
import { AppState } from "../reducers";
import { selectUserId } from "../auth/auth.selectors";
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
  getProfile(): Observable<HttpRes> {
    if (!this.userId) return of(null);

    return this.httpService.httpGetRequest(`profile/${this.userId}`).pipe(
      tap((profile: Profile) => {}),
      catchError(err => this.handleError(err))
    );
  }

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
}
