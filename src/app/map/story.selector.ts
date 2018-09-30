import { createFeatureSelector, createSelector } from "@ngrx/store";
import { StoryState } from "./story.reducer";
import { Story } from "../models/story.model";

export const selectStoryState = createFeatureSelector<StoryState>("story");

export const selectStoryList = createSelector(
  selectStoryState,
  storyState => storyState.stories
);
