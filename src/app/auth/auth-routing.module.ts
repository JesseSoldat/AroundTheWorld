import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Components
import { WelcomeComponent } from "./welcome/welcome.component";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
  { path: "", component: WelcomeComponent },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
