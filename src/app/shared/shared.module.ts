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
import { TextFormGroupComponent } from "./components/text-form-group/text-form-group.component";
import { RadioFormGroupComponent } from "./components/radio-form-group/radio-form-group.component";
import { LinkComponent } from "./components/link/link.component";
import { TextBoxComponent } from "./components/text-box/text-box.component";
import { TileCardComponent } from "./components/tile-card/tile-card.component";
import { SpinnerComponent } from "./components/spinner/spinner.component";
import { OverlayComponent } from "./components/overlay/overlay.component";
import { ListCardComponent } from "./components/list-card/list-card.component";
import { ImgCardComponent } from "./components/img-card/img-card.component";
import { TopRowBtnsComponent } from "./components/buttons/top-row-btns/top-row-btns.component";
import { BottomRowBtnsComponent } from "./components/buttons/bottom-row-btns/bottom-row-btns.component";
import { NoDataComponent } from "./components/no-data/no-data.component";
import { ErrorRetryComponent } from "./components/error-retry/error-retry.component";

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
    TextFormGroupComponent,
    RadioFormGroupComponent,
    LinkComponent,
    TextBoxComponent,
    TileCardComponent,
    SpinnerComponent,
    ListCardComponent,
    ImgCardComponent,
    TopRowBtnsComponent,
    BottomRowBtnsComponent,
    OverlayComponent,
    NoDataComponent,
    ErrorRetryComponent
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
    TextFormGroupComponent,
    RadioFormGroupComponent,
    LinkComponent,
    TextBoxComponent,
    TileCardComponent,
    SpinnerComponent,
    ListCardComponent,
    ImgCardComponent,
    TopRowBtnsComponent,
    BottomRowBtnsComponent,
    OverlayComponent,
    NoDataComponent,
    ErrorRetryComponent
  ]
})
export class SharedModule {}
