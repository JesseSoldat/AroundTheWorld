import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
// Rxjs
import { tap, catchError } from "rxjs/operators";
import { Observable, of } from "rxjs";
// Ngrx
import { Store, select } from "@ngrx/store";
import { AppState } from "../reducers";
import { selectUserId } from "../auth/auth.selectors";
import { ShowMsg } from "../shared/shared.actions";
import { OpenModal } from "../core/modals/modal.actions";
// Models
import { HttpRes } from "../models/http-res.model";
// Services
import { HttpService } from "./http.service";
// Actions
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
    private router: Router
  ) {
    this.getUserId();
  }

  // Helpers
  handleError(err) {
    console.error("friend service handleError:", err);
    this.store.dispatch(new ShowMsg({ msg: err.error.msg }));
    return of({ msg: err.error.msg, payload: null });
  }

  getUserId() {
    this.store
      .pipe(
        select(selectUserId),
        tap((userId: string) => (this.userId = userId))
      )
      .subscribe();
  }

  //----------------------  Api Calls ------------------------------
  // Send a Friends Request
  sendFriendRequest(friendId: string): Observable<HttpRes> {
    return this.httpService
      .httpPostRequest("friend/request", { userId: this.userId, friendId })
      .pipe(
        tap((res: HttpRes) => {
          const { msg, payload } = res;
          console.log("sendFriendRequest", payload);

          this.store.dispatch(new ShowMsg({ msg }));
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
