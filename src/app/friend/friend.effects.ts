import { Injectable } from "@angular/core";
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
  // small spinner
  FriendRequestDetailsRequested,
  FriendRequestDetailsLoaded,
  // overlay
  SendFriendRequestStarted,
  SendFriendRequestFinished,
  AcceptFriendRequestFinished,
  AcceptFriendRequestStarted
} from "./friend.actions";

@Injectable()
export class FriendEffects {
  constructor(private action$: Actions, private friendService: FriendService) {}

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

  // get all friend requests
  @Effect()
  friendRequestsLoaded$: Observable<
    FriendRequestLoaded | FriendError
  > = this.action$.pipe(
    ofType<FriendRequestRequested>(FriendActionTypes.FriendRequestRequested),
    switchMap(action => {
      return this.friendService.getAllFriendRequests().pipe(
        map((res: HttpRes) => {
          // any error will come back as null
          if (!res) return this.handleError();

          const { payload } = res;

          return new FriendRequestLoaded({
            friendRequests: payload.friendsRequest
          });
        }),
        catchError(err => of(null))
      );
    })
  );

  // -------------- small spinner -------------
  @Effect()
  friendRequestDetailsLoaded$: Observable<
    FriendRequestDetailsLoaded | FriendError
  > = this.action$.pipe(
    ofType<FriendRequestDetailsRequested>(
      FriendActionTypes.FriendRequestDetailsRequested
    ),
    switchMap(action => {
      const { friendRequestIds } = action.payload;
      return this.friendService
        .getAllFriendRequestsDetails(friendRequestIds)
        .pipe(
          map((res: HttpRes) => {
            // any error will come back as null
            if (!res) return this.handleError();

            const { payload } = res;

            console.log(payload);

            return new FriendRequestDetailsLoaded({
              friendRequestDetails: payload.friendRequestDetails
            });
          }),
          catchError(err => of(null))
        );
    })
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
