import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
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
// Env
import { environment } from "../../environments/environment";
// Components
import { NavbarComponent } from "./navbar/navbar.component";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    // ngrx
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot({ stateKey: "router" }),
    EffectsModule.forRoot([])
  ],
  exports: [NavbarComponent],
  declarations: [NavbarComponent],
  providers: [{ provide: RouterStateSerializer, useClass: CustomSerializer }]
})
export class CoreModule {}
