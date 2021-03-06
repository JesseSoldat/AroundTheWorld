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
import {
  FriendRequestRequested,
  FriendRequestLoaded
} from "../friend/friend.actions";

@Injectable({
  providedIn: "root"
})
export class FriendService {
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
    console.error("friend service handleError:", err);
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

  getFriends(): Observable<HttpRes> {
    if (!this.userId) return of(null);

    return this.httpService
      .httpGetRequest(`friends/${this.userId}`)
      .pipe(catchError(err => this.handleError(err)));
  }

  // get all friends request sent or received
  getAllFriendRequests(): Observable<HttpRes> {
    if (!this.userId) return of(null);

    return this.httpService
      .httpGetRequest(`friend/requests/${this.userId}`)
      .pipe(catchError(err => this.handleError(err)));
  }

  // get all friend request details
  getAllFriendRequestsDetails(friendRequestIds: string[]): Observable<HttpRes> {
    if (!this.userId) return of(null);

    return this.httpService
      .httpPostRequest(`friend/requests/details/${this.userId}`, {
        friendRequestIds
      })
      .pipe(catchError(err => this.handleError(err)));
  }

  // send a friends request
  sendFriendRequest(friendId: string): Observable<HttpRes> {
    if (!this.userId) return of(null);

    return this.httpService
      .httpPostRequest(`friend/request/${this.userId}`, { friendId })
      .pipe(
        tap((res: HttpRes) => this.handleSuccess(res.msg)),
        catchError(err => this.handleError(err))
      );
  }

  // accept a friend request
  acceptFriendRequest(friendId: string): Observable<HttpRes> {
    if (!this.userId) return of(null);

    return this.httpService
      .httpPostRequest(`friend/request/accept/${this.userId}`, { friendId })
      .pipe(
        tap((res: HttpRes) => this.handleSuccess(res.msg)),
        catchError(err => this.handleError(err))
      );
  }

  // deny a friend request
  denyFriendRequest(friendId: string) {}
}
