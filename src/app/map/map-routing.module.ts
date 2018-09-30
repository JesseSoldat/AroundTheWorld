import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Components
import { MapComponent } from "./map/map.component";
import { AddMapStoryComponent } from "./add-map-story/add-map-story.component";
import { StoryListComponent } from "./story-list/story-list.component";

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapRoutingModule {}
