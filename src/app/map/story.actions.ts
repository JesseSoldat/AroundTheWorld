import { Action } from "@ngrx/store";

import { Story } from "../models/story.model";
import { Image } from "../models/image.model";

export enum StoryActionTypes {
  StoryError = "StoryError",
  MyStoriesRequested = "MyStoriesRequested",
  MyStoriesLoaded = "MyStoriesLoaded",
  AddStoryStarted = "AddStoryStarted",
  AddStoryFinished = "AddStoryFinished",
  AddStoryImageStarted = "AddStoryImageStarted",
  AddStoryImageFinished = "AddStoryImageFinished",
  DeleteStoryImageStarted = "DeleteStoryImageStarted",
  DeleteStoryImageFinished = "DeleteStoryImageFinished",
  OtherPersonsStoriesRequested = "OtherPersonsStoriesRequested",
  OtherPersonsStoriesLoaded = "OtherPersonsStoriesLoaded",
  OtherPersonsStoryRequested = "OtherPersonsStoryRequested",
  OtherPersonsStoryLoaded = "OtherPersonsStoryLoaded"
}

// all story errors
export class StoryError implements Action {
  readonly type = StoryActionTypes.StoryError;

  constructor(public payload: { error: string }) {}
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

// delete an image from a story
export class DeleteStoryImageStarted implements Action {
  readonly type = StoryActionTypes.DeleteStoryImageStarted;

  constructor(public payload: { image: Image }) {}
}

export class DeleteStoryImageFinished implements Action {
  readonly type = StoryActionTypes.DeleteStoryImageFinished;

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
  | StoryError
  | MyStoriesRequested
  | MyStoriesLoaded
  | AddStoryStarted
  | AddStoryFinished
  | AddStoryImageStarted
  | AddStoryImageFinished
  | DeleteStoryImageStarted
  | DeleteStoryImageFinished
  | OtherPersonsStoriesRequested
  | OtherPersonsStoriesLoaded
  | OtherPersonsStoryRequested
  | OtherPersonsStoryLoaded;
