import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
// services
import { AuthGuard } from "../services/guards/auth.guard";
// components
import { ProfileComponent } from "./profile/profile.component";

const routes: Routes = [
  { path: "", component: ProfileComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
