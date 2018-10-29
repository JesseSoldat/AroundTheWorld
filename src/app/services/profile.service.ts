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
// services
import { HttpService } from "./http.service";
// actions
import { ProfileRequested, ProfileLoaded } from "../profile/profile.actions";

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

  // Helpers
  handleError(err) {
    console.error("friend service handleError:", err);

    this.toastr.error("", err.error.msg, {
      timeOut: 3000,
      positionClass: "toast-bottom-right"
    });

    return of({ msg: err.error.msg, payload: null });
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
    return this.httpService
      .httpGetRequest(`profile/${this.userId}`)
      .pipe(catchError(err => this.handleError(err)));
  }
}
