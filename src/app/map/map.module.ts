import { NgModule } from "@angular/core";
// Third Party
import { AgmCoreModule } from "@agm/core";
// Modules
import { MapRoutingModule } from "./map-routing.module";
import { SharedModule } from "../shared/shared.module";
// Components
import { MapComponent } from "./map/map.component";
import { MyMapListComponent } from "./my-map-list/my-map-list.component";
import { AddMapStoryComponent } from "./add-map-story/add-map-story.component";
import { AddMapStoryFormComponent } from "./add-map-story/add-map-story-form/add-map-story-form.component";

@NgModule({
  imports: [
    SharedModule,
    MapRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBqBYYfTpbE6RW2DDTUsws1zVV35OK2m3Y"
    })
  ],
  declarations: [
    MapComponent,
    MyMapListComponent,
    AddMapStoryComponent,
    AddMapStoryFormComponent
  ]
})
export class MapModule {}
