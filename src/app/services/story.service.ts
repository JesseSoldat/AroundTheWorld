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
// Models
import { Auth } from "../models/auth.model";
import { User } from "../models/user.model";
import { HttpRes } from "../models/http-res.model";
import { Story } from "../models/story.model";
// Services
import { HttpService } from "./http.service";
import { MyStoriesRequested, MyStoriesLoaded } from "../map/story.actions";

@Injectable({
  providedIn: "root"
})
export class StoryService {
  userId: string;

  constructor(
    private httpService: HttpService,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.store
      .pipe(
        select(selectUserId),
        tap((userId: string) => (this.userId = userId))
      )
      .subscribe();
  }

  // Helpers
  handleError(err) {
    console.error("handleError:", err);
    this.store.dispatch(new ShowMsg({ msg: err.error.msg }));
    return of({ msg: err.error.msg, payload: null });
  }

  // Api Calls
  getMyStories(): Observable<HttpRes> {
    return this.httpService.httpGetRequest(`story/${this.userId}`).pipe(
      tap((res: HttpRes) => {
        const { msg, payload } = res;
        const { stories } = payload;
        // console.log("getMyStories", payload);
        this.store.dispatch(new MyStoriesLoaded({ stories }));
      }),
      catchError(err => this.handleError(err))
    );
  }
  createNewStory(story: Story): Observable<HttpRes> {
    return this.httpService
      .httpPostRequest(`story/add/${this.userId}`, story)
      .pipe(
        tap((res: HttpRes) => {
          const { msg, payload } = res;
          // console.log('createNewStory', payload);

          this.store.dispatch(new ShowMsg({ msg }));
          this.router.navigateByUrl("/map/storyList");
        }),
        catchError(err => this.handleError(err))
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
