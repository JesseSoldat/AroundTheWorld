import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
// Firebase
import { AngularFireModule } from "angularfire2";
// import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from "angularfire2/storage";
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
import { modalReducer } from "./modals/modal.reducer";
// Routing
import { AppRoutingModule } from "../app-routing.module";
// Env
import { environment } from "../../environments/environment";
// Module
import { SharedModule } from "../shared/shared.module";
// Components
import { NavbarComponent } from "./navbar/navbar.component";
import { ModalManagerComponent } from "./modals/modal-manager/modal-manager.component";
import { MatchUsersModalComponent } from "./modals/match-users-modal/match-users-modal.component";

@NgModule({
  imports: [
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    // ngrx
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot({ stateKey: "router" }),
    StoreModule.forFeature("modal", modalReducer),
    EffectsModule.forRoot([]),
    AngularFireModule.initializeApp(environment.firebase),
    // AngularFirestoreModule,
    AngularFireStorageModule
  ],
  exports: [
    NavbarComponent,
    AppRoutingModule,
    ModalManagerComponent,
    MatchUsersModalComponent
  ],
  declarations: [
    NavbarComponent,
    ModalManagerComponent,
    MatchUsersModalComponent
  ],
  providers: [{ provide: RouterStateSerializer, useClass: CustomSerializer }]
})
export class CoreModule {}
