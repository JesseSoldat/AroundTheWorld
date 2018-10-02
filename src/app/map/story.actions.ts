import { Action } from "@ngrx/store";

import { Story } from "../models/story.model";

export enum StoryActionTypes {
  MyStoriesRequested = "MyStoriesRequested",
  MyStoriesLoaded = "MyStoriesLoaded",
  OtherPersonsStoriesRequested = "OtherPersonsStoriesRequested",
  OtherPersonsStoriesLoaded = "OtherPersonsStoriesLoaded"
}

export class MyStoriesRequested implements Action {
  readonly type = StoryActionTypes.MyStoriesRequested;
}

export class MyStoriesLoaded implements Action {
  readonly type = StoryActionTypes.MyStoriesLoaded;

  constructor(public payload: { stories: Story[] }) {}
}

export class OtherPersonsStoriesRequested implements Action {
  readonly type = StoryActionTypes.OtherPersonsStoriesRequested;
}

export class OtherPersonsStoriesLoaded implements Action {
  readonly type = StoryActionTypes.OtherPersonsStoriesLoaded;

  constructor(public payload: { stories: Story[] }) {}
}

export type StoryActions =
  | MyStoriesRequested
  | MyStoriesLoaded
  | OtherPersonsStoriesRequested
  | OtherPersonsStoriesLoaded;
