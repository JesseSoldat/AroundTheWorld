import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";

import { ImageUploadRoutingModule } from "./image-upload-routing.module";
import { ImageUploadComponent } from "../image-upload/image-upload/image-upload.component";

@NgModule({
  imports: [SharedModule, ImageUploadRoutingModule],
  declarations: [ImageUploadComponent]
})
export class ImageUploadModule {}
