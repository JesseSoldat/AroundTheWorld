import { createFeatureSelector, createSelector } from "@ngrx/store";
import { StoryState } from "./story.reducer";
import { Story } from "../models/story.model";
import * as root from "../router.selector";

export const selectStoryState = createFeatureSelector<StoryState>("story");

// router
//"matches/storyDetails/:matchedUserId/:storyId"
export const selectMatchesStoryDetailsUserId = createSelector(
  root.routerState,
  (state: any) => {
    if (!state) return null;

    return (
      state &&
      state.state &&
      state.state.params &&
      state.state.params.matchedUserId
    );
  }
);

export const selectMatchesStoryDetailsStoryId = createSelector(
  root.routerState,
  state =>
    state &&
    state.state &&
    state.state.root.firstChild &&
    state.state.root.firstChild.firstChild &&
    state.state.root.firstChild.firstChild.params.id
);

// overlay
export const selectOverlay = createSelector(
  selectStoryState,
  storyState => storyState.overlay
);

// my stories
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
// other peoples stories
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
