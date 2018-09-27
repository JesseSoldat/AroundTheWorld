import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
// Components
import { HeadingComponent } from "./components/heading/heading.component";
import { FormGroupComponent } from "./components/form-group/form-group.component";
import { LinkComponent } from "./components/link/link.component";

const routes: Routes = [];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HeadingComponent, FormGroupComponent, LinkComponent],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HeadingComponent,
    FormGroupComponent,
    LinkComponent
  ]
})
export class SharedModule {}
