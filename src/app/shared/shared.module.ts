import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
// Ngrx
import { StoreModule } from "@ngrx/store";
import { sharedReducer } from "./shared.reducer";
// Directives
import { BlurEventDirective } from "./directives/blur-event.directive";
// Pipes
// Components
import { HeadingComponent } from "./components/heading/heading.component";
import { FormGroupComponent } from "./components/form-group/form-group.component";
import { LinkComponent } from "./components/link/link.component";
import { MsgComponent } from "./components/msg/msg.component";

const routes: Routes = [];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature("shared", sharedReducer)
  ],
  declarations: [
    BlurEventDirective,
    HeadingComponent,
    FormGroupComponent,
    LinkComponent,
    MsgComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    BlurEventDirective,
    HeadingComponent,
    FormGroupComponent,
    LinkComponent,
    MsgComponent
  ]
})
export class SharedModule {}
