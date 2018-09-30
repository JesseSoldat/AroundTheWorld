import { Action } from "@ngrx/store";

import { Story } from "../models/story.model";

export enum StoryActionTypes {
  MyStoriesRequest = "MyStoriesRequest",
  MyStoriesLoaded = "MyStoriesLoaded"
}

export class MyStoriesRequested implements Action {
  readonly type = StoryActionTypes.MyStoriesRequest;
}

export class MyStoriesLoaded implements Action {
  readonly type = StoryActionTypes.MyStoriesLoaded;

  constructor(public payload: { stories: Story[] }) {}
}

export type StoryActions = MyStoriesRequested | MyStoriesLoaded;
