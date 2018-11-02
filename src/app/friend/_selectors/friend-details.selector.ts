import { createSelector } from "@ngrx/store";
// models
import { FriendState } from "../friend.reducer";
import { FriendRequest } from "../../models/friend-request.model";
// selectors
import { selectFriends } from "../friend.selector";
import { selectRouterState } from "../../router.selector";

// ------------ router -----------------
//"matches/storyDetails/:matchedUserId/:storyId"
export const selectFriendDetailsFriendId = createSelector(
  selectRouterState,
  (state: any) => {
    if (!state) return null;
    console.log("router state", state);

    return (
      state && state.state && state.state.params && state.state.params.friendId
    );
  }
);

export const selectFriendDetails = createSelector(
  selectFriendDetailsFriendId,
  selectFriends,
  (friendId, friends) => {
    if (!friendId || !friends) return null;
    console.log("friends", friends);
    console.log("friendid", friendId);

    return friends.find(friend => friend._id === friendId);
  }
);
