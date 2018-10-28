import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

import { AuthGuard } from "./services/guards/auth.guard";

const routes: Routes = [
  {
    path: "dashboard",
    loadChildren: "./dashboard/dashboard.module#DashboardModule",
    canActivate: [AuthGuard]
  },
  {
    path: "map",
    loadChildren: "./map/map.module#MapModule",
    canActivate: [AuthGuard]
  },
  {
    path: "uploadImage",
    loadChildren: "./image-upload/image-upload.module#ImageUploadModule",
    canActivate: [AuthGuard]
  },
  {
    path: "profile",
    loadChildren: "./profile/profile.module#ProfileModule",
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
