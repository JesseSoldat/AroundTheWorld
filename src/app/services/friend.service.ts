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
  FriendsRequested,
  FriendsLoaded,
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

  getFriends(): Observable<HttpRes> {
    this.store.dispatch(new FriendsRequested());
    return this.httpService.httpGetRequest(`friends/${this.userId}`).pipe(
      tap((res: HttpRes) => {
        const { payload } = res;
        this.store.dispatch(new FriendsLoaded({ friends: payload.friends }));
      }),
      catchError(err => this.handleError(err))
    );
  }
  // Send a Friends Request
  sendFriendRequest(friendId: string): Observable<HttpRes> {
    return this.httpService
      .httpPostRequest("friend/request", { userId: this.userId, friendId })
      .pipe(
        tap((res: HttpRes) => {
          const { msg, payload } = res;
          console.log("sendFriendRequest", payload);

          this.handleSuccess(msg);
        }),
        catchError(err => this.handleError(err))
      );
  }

  // Get all Friends Request Sent or Received
  allFriendRequests(): Observable<HttpRes> {
    this.store.dispatch(new FriendRequestRequested());
    return this.httpService
      .httpGetRequest(`friend/requests/${this.userId}`)
      .pipe(
        tap((res: HttpRes) => {
          const { payload } = res;
          // console.log("getFriendRequests", payload);
          this.store.dispatch(
            new FriendRequestLoaded({ friendRequests: payload.friendsRequest })
          );
        }),
        catchError(err => this.handleError(err))
      );
  }
}
