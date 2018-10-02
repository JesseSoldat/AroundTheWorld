import { StoryActionTypes } from "./story.actions";

import { Story } from "../models/story.model";

export interface StoryState {
  stories: Story[];
  otherPersonsStories: Story[];
}

export const initialStoryState: StoryState = {
  stories: null,
  otherPersonsStories: null
};

export function storyReducer(state = initialStoryState, action) {
  const { type, payload } = action;
  switch (type) {
    case StoryActionTypes.MyStoriesLoaded:
      return { ...state, stories: [...payload.stories] };

    case StoryActionTypes.OtherPersonsStoriesLoaded:
      return { ...state, otherPersonsStories: [...payload.stories] };

    case StoryActionTypes.OtherPersonsStoryLoaded:
      return { ...state };

    default:
      return { ...state };
  }
}
