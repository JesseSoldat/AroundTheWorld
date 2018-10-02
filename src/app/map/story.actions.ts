import { Action } from "@ngrx/store";

import { Story } from "../models/story.model";

export enum StoryActionTypes {
  MyStoriesRequested = "MyStoriesRequested",
  MyStoriesLoaded = "MyStoriesLoaded",
  OtherPersonsStoriesRequested = "OtherPersonsStoriesRequested",
  OtherPersonsStoriesLoaded = "OtherPersonsStoriesLoaded",
  OtherPersonsStoryRequested = "OtherPersonsStoryRequested",
  OtherPersonsStoryLoaded = "OtherPersonsStoryLoaded"
}

export class MyStoriesRequested implements Action {
  readonly type = StoryActionTypes.MyStoriesRequested;
}

export class MyStoriesLoaded implements Action {
  readonly type = StoryActionTypes.MyStoriesLoaded;

  constructor(public payload: { stories: Story[] }) {}
}

// Other Persons Stories
export class OtherPersonsStoriesRequested implements Action {
  readonly type = StoryActionTypes.OtherPersonsStoriesRequested;
}

export class OtherPersonsStoriesLoaded implements Action {
  readonly type = StoryActionTypes.OtherPersonsStoriesLoaded;

  constructor(public payload: { stories: Story[] }) {}
}

// Other Persons Story
export class OtherPersonsStoryRequested implements Action {
  readonly type = StoryActionTypes.OtherPersonsStoryRequested;
}

export class OtherPersonsStoryLoaded implements Action {
  readonly type = StoryActionTypes.OtherPersonsStoryLoaded;

  constructor(public payload: { story: Story }) {}
}

export type StoryActions =
  | MyStoriesRequested
  | MyStoriesLoaded
  | OtherPersonsStoriesRequested
  | OtherPersonsStoriesLoaded
  | OtherPersonsStoryRequested
  | OtherPersonsStoryLoaded;
