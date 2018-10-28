import { NgModule } from "@angular/core";
//ngrx
import { StoreModule } from "@ngrx/store";
import { profileReducer } from "./profile.reducer";
// modules
import { SharedModule } from "../shared/shared.module";
import { ProfileRoutingModule } from "./profile-routing.module";
// components
import { ProfileComponent } from "./profile/profile.component";
import { ProfileCardComponent } from "./profile/profile-card/profile-card.component";

@NgModule({
  imports: [
    SharedModule,
    ProfileRoutingModule,
    StoreModule.forFeature("profile", profileReducer)
  ],
  exports: [ProfileRoutingModule],
  declarations: [ProfileComponent, ProfileCardComponent]
})
export class ProfileModule {}
