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
import { Story } from "../models/story.model";
// Services
import { HttpService } from "./http.service";
import {
  MyStoriesRequested,
  MyStoriesLoaded,
  OtherPersonsStoriesRequested,
  OtherPersonsStoriesLoaded,
  OtherPersonsStoryRequested,
  OtherPersonsStoryLoaded
} from "../map/story.actions";

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

  //----------------------  Api Calls ------------------------------

  // Get All Stories
  getMyStories(): Observable<HttpRes> {
    this.store.dispatch(new MyStoriesRequested());
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

  // Post New Story
  createNewStory(story: Story): Observable<HttpRes> {
    return this.httpService
      .httpPostRequest(`story/add/${this.userId}`, story)
      .pipe(
        tap((res: HttpRes) => {
          const { msg, payload } = res;
          // console.log("createNewStory", payload);

          this.store.dispatch(new ShowMsg({ msg }));
          this.store.dispatch(
            new OpenModal({ modalType: "uploadPhotos", data: payload })
          );
        }),
        catchError(err => this.handleError(err))
      );
  }

  // Get Other Persons Stories
  getOtherPersonsStories(userId: string): Observable<HttpRes> {
    this.store.dispatch(new OtherPersonsStoriesRequested());
    return this.httpService.httpGetRequest(`story/${userId}`).pipe(
      tap((res: HttpRes) => {
        const { msg, payload } = res;
        const { stories } = payload;
        // console.log("otherPersonsStories", payload);
        this.store.dispatch(new OtherPersonsStoriesLoaded({ stories }));
      }),
      catchError(err => this.handleError(err))
    );
  }

  // Get Other Persons Story
  getOtherPersonsStory(storyId: string): Observable<HttpRes> {
    this.store.dispatch(new OtherPersonsStoryRequested());
    return this.httpService.httpGetRequest(`story/details/${storyId}`).pipe(
      tap((res: HttpRes) => {
        const { msg, payload } = res;
        const { story } = payload;
        // console.log("otherPersonsStory", payload);
        this.store.dispatch(new OtherPersonsStoryLoaded({ story }));
      }),
      catchError(err => this.handleError(err))
    );
  }

  // Match with Other Peoples Stories
  matchOtherUsers(matchQuery): Observable<HttpRes> {
    const { unit, maxDistance, coordinates } = matchQuery;

    const lng = coordinates[0];
    const lat = coordinates[1];

    return this.httpService
      .httpGetRequest(
        `story/match/${
          this.userId
        }?lat=${lat}&lng=${lng}&unit=${unit}&maxDistance=${maxDistance}`
      )
      .pipe(
        tap((res: HttpRes) => {
          const { msg, payload } = res;

          this.store.dispatch(
            new OpenModal({ modalType: "matchUser", data: payload })
          );
        }),
        catchError(err => this.handleError(err.error))
      );
  }
}
