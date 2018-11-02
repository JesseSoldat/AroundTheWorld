import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
// rxjs
import { switchMap, map, catchError } from "rxjs/operators";
import { Observable, of } from "rxjs";
// ngrx
import { Actions, Effect, ofType } from "@ngrx/effects";
// services
import { FriendService } from "../services/friend.service";
// models
import { HttpRes } from "../models/http-res.model";
// actions
import {
  FriendError,
  FriendActionTypes,
  // loading
  FriendsRequested,
  FriendsLoaded,
  FriendRequestRequested,
  FriendRequestLoaded,
  // overlay
  SendFriendRequestStarted,
  SendFriendRequestFinished,
  AcceptFriendRequestFinished,
  AcceptFriendRequestStarted
} from "./friend.actions";

@Injectable()
export class FriendEffects {
  constructor(
    private action$: Actions,
    private friendService: FriendService,
    private router: Router
  ) {}

  // helpers
  handleError() {
    return new FriendError({ error: "Could not fetch the profile" });
  }
  // ------------- loading -----------------

  // get all friends
  @Effect()
  friendsLoaded$: Observable<FriendsLoaded | FriendError> = this.action$.pipe(
    ofType<FriendsRequested>(FriendActionTypes.FriendsRequested),
    switchMap(action =>
      this.friendService.getFriends().pipe(
        map((res: HttpRes) => {
          // any error will come back as null
          if (!res) return this.handleError();

          return new FriendsLoaded({ friends: res.payload.friends });
        }),
        catchError(err => of(null))
      )
    )
  );

  // -------------- overlay -----------------

  // send a friend request
  @Effect()
  sendFriendRequestFinished$: Observable<
    SendFriendRequestFinished | FriendError
  > = this.action$.pipe(
    ofType<SendFriendRequestStarted>(
      FriendActionTypes.SendFriendRequestStarted
    ),
    switchMap(action =>
      this.friendService.sendFriendRequest(action.payload.friendId).pipe(
        map((res: HttpRes) => {
          // any error will come back as null
          if (!res) return this.handleError();

          return new SendFriendRequestFinished({
            friendRequest: res.payload.friendRequest
          });
        }),
        catchError(err => of(null))
      )
    )
  );

  // accept a friend request
  @Effect()
  acceptFriendRequestFinished$: Observable<
    AcceptFriendRequestFinished | FriendError
  > = this.action$.pipe(
    ofType<AcceptFriendRequestStarted>(
      FriendActionTypes.AcceptFriendRequestStarted
    ),
    switchMap(action => {
      return this.friendService
        .acceptFriendRequest(action.payload.friendId)
        .pipe(
          map((res: HttpRes) => {
            // any error will come back as null
            if (!res) return this.handleError();

            const { friendRequestId, friends } = res.payload;

            return new AcceptFriendRequestFinished({
              friendRequestId,
              friends
            });
          }),
          catchError(err => of(null))
        );
    })
  );
}
