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
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { SideBarComponent } from "./edit-profile/side-bar/side-bar.component";

@NgModule({
  imports: [
    SharedModule,
    ProfileRoutingModule,
    StoreModule.forFeature("profile", profileReducer)
  ],
  exports: [ProfileRoutingModule],
  declarations: [
    ProfileComponent,
    ProfileCardComponent,
    EditProfileComponent,
    SideBarComponent
  ]
})
export class ProfileModule {}
