import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
// services
import { AuthGuard } from "../services/guards/auth.guard";
// components
import { FriendsComponent } from "./friends/friends.component";

const routes: Routes = [
  { path: "friends", component: FriendsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FriendRoutingModule {}
