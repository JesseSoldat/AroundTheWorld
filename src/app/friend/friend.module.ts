import { NgModule } from "@angular/core";
//Ngrx
import { StoreModule } from "@ngrx/store";
import { friendReducer } from "./friend.reducer";
// Modules
import { SharedModule } from "../shared/shared.module";
import { FriendRoutingModule } from "./friend-routing.module";
// Components
import { FriendsComponent } from "./friends/friends.component";

@NgModule({
  imports: [
    SharedModule,
    FriendRoutingModule,
    StoreModule.forFeature("friend", friendReducer)
  ],
  declarations: [FriendsComponent]
})
export class FriendModule {}
