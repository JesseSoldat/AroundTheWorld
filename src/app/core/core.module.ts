import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
// firebase
import { AngularFireModule } from "angularfire2";
import { AngularFireStorageModule } from "angularfire2/storage";
// ngrx
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
// routing
import { AppRoutingModule } from "../app-routing.module";
// env
import { environment } from "../../environments/environment";
// module
import { SharedModule } from "../shared/shared.module";
// components
import { NavbarComponent } from "./navbar/navbar.component";
import { FriendListGroupComponent } from "./navbar/friend-list-group/friend-list-group.component";
import { FriendBtnGroupComponent } from "./navbar/friend-btn-group/friend-btn-group.component";
// modals
import { ModalManagerComponent } from "./modals/modal-manager/modal-manager.component";
import { MatchUsersModalComponent } from "./modals/match-users-modal/match-users-modal.component";
import { UploadImageModalComponent } from "./modals/upload-image-modal/upload-image-modal.component";
import { FriendRequestModalComponent } from "./modals/friend-request-modal/friend-request-modal.component";
import { ImageDetailsModalComponent } from "./modals/image-details-modal/image-details-modal.component";

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
    FriendBtnGroupComponent,
    FriendListGroupComponent,
    AppRoutingModule,
    ModalManagerComponent,
    MatchUsersModalComponent
  ],
  declarations: [
    NavbarComponent,
    FriendBtnGroupComponent,
    FriendListGroupComponent,
    ModalManagerComponent,
    MatchUsersModalComponent,
    UploadImageModalComponent,
    FriendRequestModalComponent,
    ImageDetailsModalComponent
  ],
  providers: [{ provide: RouterStateSerializer, useClass: CustomSerializer }]
})
export class CoreModule {}
