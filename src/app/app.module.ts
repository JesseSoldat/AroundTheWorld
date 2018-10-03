import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

// Modules
import { CoreModule } from "./core/core.module";
import { AuthModule } from "./auth/auth.module";
import { FriendModule } from "./friend/friend.module";

// Components
import { AppComponent } from "./app.component";
// SW
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
// Services
import { HttpService } from "./services/http.service";
import { AuthService } from "./services/auth.service";
import { StoryService } from "./services/story.service";
import { FriendService } from "./services/friend.service";
// Interceptors
import { AuthInterceptor } from "./services/interceptors/auth.interceptor";
// Guards
import { AuthGuard } from "./services/guards/auth.guard";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CoreModule,
    AuthModule,
    FriendModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production
    })
  ],
  providers: [
    HttpService,
    AuthService,
    StoryService,
    FriendService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
