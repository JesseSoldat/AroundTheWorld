import { createFeatureSelector, createSelector } from "@ngrx/store";
import { StoryState } from "./story.reducer";
import { Story } from "../models/story.model";

export const selectStoryState = createFeatureSelector<StoryState>("story");

// My Stories
export const selectStoryList = createSelector(
  selectStoryState,
  storyState => storyState.stories
);

export const selectStory = (storyId: string) => {
  return createSelector(selectStoryList, stories => {
    if (stories === null) return null;
    return stories.find(story => story._id === storyId);
  });
};
// Other Peoples' Stories
export const selectOtherPersonsStoryList = createSelector(
  selectStoryState,
  storyState => storyState.otherPersonsStories
);

export const selectOtherPersonsStory = (storyId: string) => {
  return createSelector(selectOtherPersonsStoryList, stories => {
    if (stories === null) return null;
    return stories.find(story => story._id === storyId);
  });
};
