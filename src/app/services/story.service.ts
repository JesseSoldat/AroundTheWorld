import { Injectable } from "@angular/core";
// Rxjs
import { tap, catchError } from "rxjs/operators";
import { Observable, of } from "rxjs";
// Ngrx
import { Store, select } from "@ngrx/store";
import { AppState } from "../reducers";
import { selectUserId } from "../auth/auth.selectors";
import { ShowMsg } from "../shared/shared.actions";
// Models
import { Auth } from "../models/auth.model";
import { User } from "../models/user.model";
import { HttpRes } from "../models/http-res.model";
// Utils
import { decodeToken } from "../utils/auth/decodeToken";
// Services
import { HttpService } from "./http.service";

@Injectable({
  providedIn: "root"
})
export class StoryService {
  userId: string;

  constructor(
    private httpService: HttpService,
    private store: Store<AppState>
  ) {
    this.store
      .pipe(
        select(selectUserId),
        tap(userId => (this.userId = userId))
      )
      .subscribe();
  }

  // Helpers
  handleError(err) {
    this.store.dispatch(new ShowMsg({ msg: err.msg }));
    return of({ msg: err.msg, payload: null });
  }

  // Api Calls
  createNewStory(story): Observable<HttpRes> {
    return this.httpService
      .httpPostRequest(`story/add/${this.userId}`, story)
      .pipe(
        tap((res: HttpRes) => {
          const { msg, payload } = res;
          console.log(payload);

          this.store.dispatch(new ShowMsg({ msg }));
        }),
        catchError(err => this.handleError(err.error))
      );
  }

  matchOtherUsers(coordinates): Observable<HttpRes> {
    // tokyo
    const lat = 35.689487;
    const lng = 139.691711;
    return this.httpService
      .httpGetRequest(`story/match/${this.userId}?lat=${lat}&lng=${lng}`)
      .pipe(
        tap((res: HttpRes) => {
          const { msg, payload } = res;
          console.log(payload);

          this.store.dispatch(new ShowMsg({ msg }));
        }),
        catchError(err => this.handleError(err.error))
      );
  }
}
