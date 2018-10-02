import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Components
import { UploadImageComponent } from "./upload-image/upload-image.component";

const routes: Routes = [
  {
    path: "/:userId/:storyId",
    component: UploadImageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhotosRoutingModule {}
