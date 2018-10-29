import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
// rxjs
import { tap, catchError } from "rxjs/operators";
import { Observable, of } from "rxjs";
// ngrx
import { Store, select } from "@ngrx/store";
import { AppState } from "../reducers";
import { selectUserId } from "../auth/auth.selectors";
import { OpenModal } from "../core/modals/modal.actions";
// models
import { HttpRes } from "../models/http-res.model";
import { Story } from "../models/story.model";
// services
import { HttpService } from "./http.service";
// actions
import {
  MyStoriesRequested,
  MyStoriesLoaded,
  AddStoryStarted,
  AddStoryFinished,
  AddStoryImageStarted,
  AddStoryImageFinished,
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
    private toastr: ToastrService
  ) {
    this.getUserId();
  }

  // helpers
  handleError(err) {
    console.error("story service handleError:", err);

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

  //------------------  api calls -----------------------

  // get all stories
  getMyStories(): Observable<HttpRes> {
    if (!this.userId) return of(null);
    this.store.dispatch(new MyStoriesRequested());
    return this.httpService.httpGetRequest(`story/${this.userId}`).pipe(
      tap((res: HttpRes) => {
        const { payload } = res;
        const { stories } = payload;
        // console.log("getMyStories", payload);
        this.store.dispatch(new MyStoriesLoaded({ stories }));
      }),
      catchError(err => this.handleError(err))
    );
  }

  // post new story
  createNewStory(story: Story): Observable<HttpRes> {
    this.store.dispatch(new AddStoryStarted());
    return this.httpService
      .httpPostRequest(`story/add/${this.userId}`, story)
      .pipe(
        tap((res: HttpRes) => {
          const { msg, payload } = res;
          const { story } = payload;
          // console.log("createNewStory", story);

          this.handleSuccess(msg);
          this.store.dispatch(
            new OpenModal({ modalType: "uploadPhotos", data: story })
          );
          this.store.dispatch(new AddStoryFinished({ update: story }));
        }),
        catchError(err => this.handleError(err))
      );
  }

  // add image urls to story
  addImageToStory(url: string, storyId: string): Observable<HttpRes> {
    this.store.dispatch(new AddStoryImageStarted());
    return this.httpService
      .httpPatchRequest(`story/addImage/${storyId}`, { url })
      .pipe(
        tap((res: HttpRes) => {
          const { msg, payload } = res;
          const { story } = payload;
          // console.log("addImageToStory", story);

          this.handleSuccess(msg);
          this.store.dispatch(new AddStoryImageFinished({ update: story }));
        }),
        catchError(err => this.handleError(err))
      );
  }

  // get other persons stories
  getOtherPersonsStories(userId: string): Observable<HttpRes> {
    if (!this.userId) return of(null);
    this.store.dispatch(new OtherPersonsStoriesRequested());
    return this.httpService.httpGetRequest(`story/${userId}`).pipe(
      tap((res: HttpRes) => {
        const { payload } = res;
        const { stories } = payload;
        // console.log("otherPersonsStories", payload);
        this.store.dispatch(new OtherPersonsStoriesLoaded({ stories }));
      }),
      catchError(err => this.handleError(err))
    );
  }

  // get other persons story
  getOtherPersonsStory(storyId: string): Observable<HttpRes> {
    this.store.dispatch(new OtherPersonsStoryRequested());
    return this.httpService.httpGetRequest(`story/details/${storyId}`).pipe(
      tap((res: HttpRes) => {
        const { payload } = res;
        const { story } = payload;
        // console.log("otherPersonsStory", payload);
        this.store.dispatch(new OtherPersonsStoryLoaded({ story }));
      }),
      catchError(err => this.handleError(err))
    );
  }

  // match with other peoples stories
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
          const { payload } = res;

          this.store.dispatch(
            new OpenModal({ modalType: "matchUser", data: payload })
          );
        }),
        catchError(err => this.handleError(err.error))
      );
  }
}
