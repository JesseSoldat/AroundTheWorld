import { NgModule } from "@angular/core";
//ngrx
import { StoreModule } from "@ngrx/store";
import { friendReducer } from "./friend.reducer";
// modules
import { SharedModule } from "../shared/shared.module";
import { FriendRoutingModule } from "./friend-routing.module";
// components
import { FriendsComponent } from "./friends/friends.component";

@NgModule({
  imports: [
    SharedModule,
    FriendRoutingModule,
    StoreModule.forFeature("friend", friendReducer)
  ],
  exports: [FriendRoutingModule],
  declarations: [FriendsComponent]
})
export class FriendModule {}
