import { NgModule } from "@angular/core";
// Third Party
import { AgmCoreModule } from "@agm/core";
// Ngrx
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoryEffects } from "./story.effects";
import { storyReducer } from "./story.reducer";
// Modules
import { MapRoutingModule } from "./map-routing.module";
import { SharedModule } from "../shared/shared.module";
// Components
import { MapComponent } from "./map/map.component";
import { StoryListComponent } from "./story-list/story-list.component";
import { AddMapStoryComponent } from "./add-map-story/add-map-story.component";
import { AddMapStoryFormComponent } from "./add-map-story/add-map-story-form/add-map-story-form.component";
import { MatchesStoryListComponent } from "./matches-story-list/matches-story-list.component";
import { MatchesStoryDetailsComponent } from "./matches-story-details/matches-story-details.component";
import { StoryDetailsComponent } from "./story-details/story-details.component";
import { FriendsPhotosComponent } from "./matches-story-details/friends-photos/friends-photos.component";

@NgModule({
  imports: [
    SharedModule,
    MapRoutingModule,
    StoreModule.forFeature("story", storyReducer),
    EffectsModule.forFeature([StoryEffects]),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBqBYYfTpbE6RW2DDTUsws1zVV35OK2m3Y"
    })
  ],
  declarations: [
    MapComponent,
    AddMapStoryComponent,
    AddMapStoryFormComponent,
    StoryListComponent,
    MatchesStoryListComponent,
    MatchesStoryDetailsComponent,
    StoryDetailsComponent,
    FriendsPhotosComponent
  ]
})
export class MapModule {}
