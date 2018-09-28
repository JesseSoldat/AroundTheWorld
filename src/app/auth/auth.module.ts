import { NgModule } from "@angular/core";
// Ngrx
import { StoreModule } from "@ngrx/store";
import * as fromAuth from "./auth.reducer";
import { EffectsModule } from "@ngrx/effects";
import { AuthEffects } from "./auth.effects";
// Modules
import { SharedModule } from "../shared/shared.module";
import { AuthRoutingModule } from "./auth-routing.module";
// Components
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { WelcomeComponent } from "./welcome/welcome.component";

@NgModule({
  imports: [
    SharedModule,
    AuthRoutingModule,
    StoreModule.forFeature("auth", fromAuth.authReducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  declarations: [RegisterComponent, LoginComponent, WelcomeComponent]
})
export class AuthModule {}
