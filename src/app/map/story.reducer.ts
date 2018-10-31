import { StoryActionTypes } from "./story.actions";
import { AuthActionTypes } from "../auth/auth.actions";

import { Story } from "../models/story.model";

export interface StoryState {
  error: string;
  overlay: boolean;
  stories: Story[];
  otherPersonsStories: Story[];
}

export const initialStoryState: StoryState = {
  error: null,
  overlay: false,
  stories: null,
  otherPersonsStories: null
};

// helpers
const addNewStoryToStories = (prevStories, update) => {
  const updatedStories = prevStories ? [...prevStories] : [];
  updatedStories.unshift(update);
  return updatedStories;
};

const addImageToStory = (prevStories, update) => {
  if (!prevStories) return null;

  const updatedStories = [...prevStories];

  const index = updatedStories.findIndex(story => story._id === update._id);
  console.log("addImageToStory index", index);

  if (index === -1) return null;

  updatedStories.splice(index, 1, update);

  return updatedStories;
};

const deleteImageFromStory = (prevStories, update) => {
  if (!prevStories) return null;

  const updatedStories = [...prevStories];

  const index = updatedStories.findIndex(story => story._id === update._id);

  console.log("removeImageFromStory index", index);

  if (index === -1) return null;

  updatedStories.splice(index, 1, update);

  return updatedStories;
};

export function storyReducer(state = initialStoryState, action) {
  const { type, payload } = action;
  switch (type) {
    // clear all state
    case AuthActionTypes.LogoutAction:
      return {
        overlay: false,
        stories: null,
        otherPersonsStories: null,
        error: null
      };

    // handle error
    case StoryActionTypes.StoryError:
      return { ...state, error: payload.error };

    // ----------- loading ---------------
    case StoryActionTypes.MyStoriesLoaded:
      return { ...state, stories: [...payload.stories] };

    case StoryActionTypes.OtherPersonsStoriesLoaded:
      return { ...state, otherPersonsStories: [...payload.stories] };

    case StoryActionTypes.OtherPersonsStoryLoaded:
      return { ...state };

    // ----------- overlay ----------------

    // add a new story
    case StoryActionTypes.AddStoryStarted:
      return { ...state, overlay: true };

    case StoryActionTypes.AddStoryFinished:
      return {
        ...state,
        overlay: false,
        stories: addNewStoryToStories(state.stories, payload.update)
      };

    // add an image to a story
    case StoryActionTypes.AddStoryImageStarted:
    case StoryActionTypes.DeleteStoryImageStarted:
      return { ...state, overlay: true };

    case StoryActionTypes.AddStoryImageFinished:
      return {
        ...state,
        overlay: false,
        stories: addImageToStory(state.stories, payload.update)
      };

    case StoryActionTypes.DeleteStoryImageFinished:
      return {
        ...state,
        overlay: false,
        stories: deleteImageFromStory(state.stories, payload.update)
      };

    default:
      return { ...state };
  }
}
