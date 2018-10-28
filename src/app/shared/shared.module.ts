import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
// ng bootstrap
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

// directives
import { BlurEventDirective } from "./directives/blur-event.directive";
import { DropZoneDirective } from "./directives/drop-zone.directive";
// pipes
import { TruncatePipe } from "./pipes/truncate.pipe";
import { FileSizePipe } from "./pipes/file-size.pipe";
// components
import { HeadingComponent } from "./components/heading/heading.component";
import { FormGroupComponent } from "./components/form-group/form-group.component";
import { LinkComponent } from "./components/link/link.component";
import { TextBoxComponent } from "./components/text-box/text-box.component";
import { TileCardComponent } from "./components/tile-card/tile-card.component";
import { SpinnerComponent } from "./components/spinner/spinner.component";
import { ListCardComponent } from "./components/list-card/list-card.component";
import { ImgCardComponent } from "./components/img-card/img-card.component";
import { TopRowBtnsComponent } from "./components/buttons/top-row-btns/top-row-btns.component";
import { BottomRowBtnsComponent } from "./components/buttons/bottom-row-btns/bottom-row-btns.component";

const routes: Routes = [];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    BlurEventDirective,
    DropZoneDirective,
    TruncatePipe,
    FileSizePipe,
    HeadingComponent,
    FormGroupComponent,
    LinkComponent,
    TextBoxComponent,
    TileCardComponent,
    SpinnerComponent,
    ListCardComponent,
    ImgCardComponent,
    TopRowBtnsComponent,
    BottomRowBtnsComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgbModule,
    ReactiveFormsModule,
    BlurEventDirective,
    DropZoneDirective,
    TruncatePipe,
    FileSizePipe,
    HeadingComponent,
    FormGroupComponent,
    LinkComponent,
    TextBoxComponent,
    TileCardComponent,
    SpinnerComponent,
    ListCardComponent,
    ImgCardComponent,
    TopRowBtnsComponent,
    BottomRowBtnsComponent
  ]
})
export class SharedModule {}
