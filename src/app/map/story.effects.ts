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
  DeleteStoryImageStarted,
  DeleteStoryImageFinished
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
