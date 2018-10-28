import { Action } from "@ngrx/store";

import { Story } from "../models/story.model";

export enum StoryActionTypes {
  MyStoriesRequested = "MyStoriesRequested",
  MyStoriesLoaded = "MyStoriesLoaded",
  AddStoryStarted = "AddStoryStarted",
  AddStoryFinished = "AddStoryFinished",
  AddStoryImageStarted = "AddStoryImageStarted",
  AddStoryImageFinished = "AddStoryImageFinished",
  OtherPersonsStoriesRequested = "OtherPersonsStoriesRequested",
  OtherPersonsStoriesLoaded = "OtherPersonsStoriesLoaded",
  OtherPersonsStoryRequested = "OtherPersonsStoryRequested",
  OtherPersonsStoryLoaded = "OtherPersonsStoryLoaded"
}

// current user stories
export class MyStoriesRequested implements Action {
  readonly type = StoryActionTypes.MyStoriesRequested;
}

export class MyStoriesLoaded implements Action {
  readonly type = StoryActionTypes.MyStoriesLoaded;

  constructor(public payload: { stories: Story[] }) {}
}

// add a new story
export class AddStoryStarted implements Action {
  readonly type = StoryActionTypes.AddStoryStarted;
}

export class AddStoryFinished implements Action {
  readonly type = StoryActionTypes.AddStoryFinished;

  constructor(public payload: { update: Story }) {}
}

// add a new image to story
export class AddStoryImageStarted implements Action {
  readonly type = StoryActionTypes.AddStoryImageStarted;
}

export class AddStoryImageFinished implements Action {
  readonly type = StoryActionTypes.AddStoryImageFinished;

  constructor(public payload: { update: Story }) {}
}

// other persons stories
export class OtherPersonsStoriesRequested implements Action {
  readonly type = StoryActionTypes.OtherPersonsStoriesRequested;
}

export class OtherPersonsStoriesLoaded implements Action {
  readonly type = StoryActionTypes.OtherPersonsStoriesLoaded;

  constructor(public payload: { stories: Story[] }) {}
}

// other persons story
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
  | AddStoryStarted
  | AddStoryFinished
  | AddStoryImageStarted
  | AddStoryImageFinished
  | OtherPersonsStoriesRequested
  | OtherPersonsStoriesLoaded
  | OtherPersonsStoryRequested
  | OtherPersonsStoryLoaded;
