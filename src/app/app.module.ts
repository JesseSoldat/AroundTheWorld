import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

// modules
import { CoreModule } from "./core/core.module";
import { AuthModule } from "./auth/auth.module";
import { FriendModule } from "./friend/friend.module";
// 3rd party
import { ToastrModule } from "ngx-toastr";
// components
import { AppComponent } from "./app.component";
// sw
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
// services
import { HttpService } from "./services/http.service";
import { AuthService } from "./services/auth.service";
import { StoryService } from "./services/story.service";
import { FriendService } from "./services/friend.service";
// interceptors
import { AuthInterceptor } from "./services/interceptors/auth.interceptor";
// guards
import { AuthGuard } from "./services/guards/auth.guard";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
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
