import { NgModule } from "@angular/core";
// Third Party
import { AgmCoreModule } from "@agm/core";
// Ngrx
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { storyReducer } from "./story.reducer";
// Modules
import { MapRoutingModule } from "./map-routing.module";
import { SharedModule } from "../shared/shared.module";
// Components
import { MapComponent } from "./map/map.component";
import { StoryListComponent } from "./story-list/story-list.component";
import { AddMapStoryComponent } from "./add-map-story/add-map-story.component";
import { AddMapStoryFormComponent } from "./add-map-story/add-map-story-form/add-map-story-form.component";

@NgModule({
  imports: [
    SharedModule,
    MapRoutingModule,
    StoreModule.forFeature("story", storyReducer),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBqBYYfTpbE6RW2DDTUsws1zVV35OK2m3Y"
    })
  ],
  declarations: [
    MapComponent,
    AddMapStoryComponent,
    AddMapStoryFormComponent,
    StoryListComponent
  ]
})
export class MapModule {}
