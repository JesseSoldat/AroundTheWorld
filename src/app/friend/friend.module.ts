import { NgModule } from "@angular/core";
//ngrx
import { StoreModule } from "@ngrx/store";
import { friendReducer } from "./friend.reducer";
import { EffectsModule } from "@ngrx/effects";
import { FriendEffects } from "./friend.effects";
// modules
import { SharedModule } from "../shared/shared.module";
import { FriendRoutingModule } from "./friend-routing.module";
// components
import { FriendsComponent } from "./friends/friends.component";

@NgModule({
  imports: [
    SharedModule,
    FriendRoutingModule,
    StoreModule.forFeature("friend", friendReducer),
    EffectsModule.forFeature([FriendEffects])
  ],
  exports: [FriendRoutingModule],
  declarations: [FriendsComponent]
})
export class FriendModule {}
