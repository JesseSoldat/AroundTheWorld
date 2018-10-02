import { NgModule } from "@angular/core";
// Modules
import { SharedModule } from "../shared/shared.module";
import { PhotosRoutingModule } from "./photos-routing.module";
// Components
import { UploadImageComponent } from "./upload-image/upload-image.component";

@NgModule({
  imports: [PhotosRoutingModule, SharedModule],
  declarations: [UploadImageComponent]
})
export class PhotosModule {}
