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
  FriendsRequested,
  FriendsLoaded,
  FriendRequestRequested,
  FriendRequestLoaded
} from "./friend.actions";

@Injectable()
export class FriendEffects {
  constructor(private action$: Actions, private friendService: FriendService) {}

  // Helpers
  handleError() {
    return new FriendError({ error: "Could not fetch the profile" });
  }

  @Effect()
  friendRequested$: Observable<
    FriendsLoaded | FriendError
  > = this.action$.pipe(
    ofType<FriendsRequested>(FriendActionTypes.FriendsRequested),
    switchMap(action =>
      this.friendService.getFriends().pipe(
        map(
          (res: HttpRes) => {
            // any error will come back as null
            if (!res) return this.handleError();

            const { payload } = res;

            return new FriendsLoaded({ friends: payload.friends });
          },
          catchError(err => {
            return of(null);
          })
        )
      )
    )
  );
}
