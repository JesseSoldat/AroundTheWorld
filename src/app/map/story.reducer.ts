import { StoryActionTypes } from "./story.actions";

import { Story } from "../models/story.model";

export interface StoryState {
  stories: Story[];
}

export const initialStoryState: StoryState = {
  stories: null
};

export function storyReducer(state = initialStoryState, action) {
  const { type, payload } = action;
  switch (type) {
    case StoryActionTypes.MyStoriesLoaded:
      return { ...state, stories: [...payload.stories] };

    default:
      return { ...state };
  }
}
