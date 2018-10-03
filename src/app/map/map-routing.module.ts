import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Components
import { MapComponent } from "./map/map.component";
import { AddMapStoryComponent } from "./add-map-story/add-map-story.component";
import { StoryListComponent } from "./story-list/story-list.component";
import { StoryDetailsComponent } from "./story-details/story-details.component";
import { MatchesStoryListComponent } from "./matches-story-list/matches-story-list.component";
import { MatchesStoryDetailsComponent } from "./matches-story-details/matches-story-details.component";

const routes: Routes = [
  {
    path: "",
    component: MapComponent
  },
  {
    path: "addMapStory",
    component: AddMapStoryComponent
  },
  {
    path: "storyList",
    component: StoryListComponent
  },
  {
    path: "storyDetails/:userId/:storyId",
    component: StoryDetailsComponent
  },
  {
    path: "matches/storyList/:userId",
    component: MatchesStoryListComponent
  },
  {
    path: "matches/storyDetails/:storyId",
    component: MatchesStoryDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapRoutingModule {}
