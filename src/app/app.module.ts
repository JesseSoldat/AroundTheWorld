import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// Modules
import { CoreModule } from "./core/core.module";
import { AuthModule } from "./auth/auth.module";

// Components
import { AppComponent } from "./app.component";
// SW
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
// Services
import { HttpService } from "./services/http.service";
import { AuthService } from "./services/auth.service";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CoreModule,
    AuthModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production
    })
  ],
  providers: [HttpService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
