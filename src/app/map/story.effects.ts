import { Injectable } from "@angular/core";
// rxjs
import { switchMap, map, catchError } from "rxjs/operators";
import { Observable, of } from "rxjs";
// ngrx
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { AppState } from "../reducers";
// services
import { StoryService } from "../services/story.service";
// models
import { HttpRes } from "../models/http-res.model";
// actions
import {
  StoryError,
  StoryActionTypes,
  MyStoriesRequested,
  MyStoriesLoaded,
  DeleteStoryImageStarted,
  DeleteStoryImageFinished,
  MatchOtherUsersStarted,
  MatchOtherUsersFinished,
  OtherPersonsStoriesRequested,
  OtherPersonsStoriesLoaded
} from "./story.actions";

@Injectable()
export class StoryEffects {
  constructor(
    private action$: Actions,
    private storyService: StoryService,
    private store: Store<AppState>
  ) {}

  // helpers
  handleError(error = null) {
    return new StoryError({ error });
  }

  @Effect()
  getMyStories$: Observable<MyStoriesLoaded | StoryError> = this.action$.pipe(
    ofType<MyStoriesRequested>(StoryActionTypes.MyStoriesRequested),
    switchMap(action =>
      this.storyService.getMyStories().pipe(
        map((res: HttpRes) => {
          // any error will come back as null
          if (!res) return this.handleError();
          const { payload } = res;
          return new MyStoriesLoaded({ stories: payload.stories });
        }),
        catchError(err => {
          return of(null);
        })
      )
    )
  );

  @Effect()
  matchOtherUsers$: Observable<
    MatchOtherUsersFinished | StoryError
  > = this.action$.pipe(
    ofType<MatchOtherUsersStarted>(StoryActionTypes.MatchOtherUsersStarted),
    switchMap(action => {
      const { matchQuery } = action.payload;
      return this.storyService.matchOtherUsers(matchQuery).pipe(
        map((res: HttpRes) => {
          // any error will come back as null
          if (!res) return this.handleError();

          return new MatchOtherUsersFinished();
        }),
        catchError(err => {
          return of(null);
        })
      );
    })
  );

  @Effect()
  getOtherPersonsStories$: Observable<
    OtherPersonsStoriesLoaded | StoryError
  > = this.action$.pipe(
    ofType<OtherPersonsStoriesRequested>(
      StoryActionTypes.OtherPersonsStoriesRequested
    ),
    switchMap(action => {
      const { matchedUserId } = action.payload;
      return this.storyService.getOtherPersonsStories(matchedUserId).pipe(
        map((res: HttpRes) => {
          // any error will come back as null
          if (!res) return this.handleError();

          const { stories } = res.payload;

          return new OtherPersonsStoriesLoaded({ stories });
        }),
        catchError(err => {
          return of(null);
        })
      );
    })
  );

  @Effect()
  deleteStoryImage$: Observable<
    DeleteStoryImageFinished | StoryError
  > = this.action$.pipe(
    ofType<DeleteStoryImageStarted>(StoryActionTypes.DeleteStoryImageStarted),
    switchMap(action => {
      const imageId = action.payload.image._id;
      const storyId = action.payload.image.storyId;

      return this.storyService.deleteStoryImage(storyId, imageId).pipe(
        map((res: HttpRes) => {
          // any error will come back as null
          if (!res) return this.handleError();

          const { payload } = res;

          return new DeleteStoryImageFinished({ update: payload.story });
        }),
        catchError(err => {
          return of(null);
        })
      );
    })
  );
}
