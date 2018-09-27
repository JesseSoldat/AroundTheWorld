import { NgModule } from "@angular/core";
// Modules
import { SharedModule } from "../shared/shared.module";
// Components
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";

@NgModule({
  imports: [SharedModule],
  declarations: [RegisterComponent, LoginComponent]
})
export class AuthModule {}
