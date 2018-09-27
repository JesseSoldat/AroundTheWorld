import { NgModule } from "@angular/core";
// Modules
import { SharedModule } from "../shared/shared.module";
import { AuthRoutingModule } from "./auth-routing.module";
// Components
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  imports: [SharedModule, AuthRoutingModule],
  declarations: [RegisterComponent, LoginComponent, WelcomeComponent]
})
export class AuthModule {}
