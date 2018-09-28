import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
// Ngrx
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import {
  RouterStateSerializer,
  StoreRouterConnectingModule
} from "@ngrx/router-store";
import { EffectsModule } from "@ngrx/effects";
import { reducers, metaReducers } from "../reducers";
import { CustomSerializer } from "../reducers/customSerialize";
// Routing
import { AppRoutingModule } from "../app-routing.module";
// Env
import { environment } from "../../environments/environment";
// Module
import { SharedModule } from "../shared/shared.module";
// Components
import { NavbarComponent } from "./navbar/navbar.component";
import { MessageComponent } from "./message/message.component";

@NgModule({
  imports: [
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    // ngrx
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot({ stateKey: "router" }),
    EffectsModule.forRoot([])
  ],
  exports: [NavbarComponent, AppRoutingModule, MessageComponent],
  declarations: [NavbarComponent, MessageComponent],
  providers: [{ provide: RouterStateSerializer, useClass: CustomSerializer }]
})
export class CoreModule {}
