import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-bottom-row-btns",
  templateUrl: "./bottom-row-btns.component.html",
  styleUrls: ["./bottom-row-btns.component.css"]
})
export class BottomRowBtnsComponent {
  @Output()
  onBtnClick: EventEmitter<string> = new EventEmitter();
  @Input()
  backBtn;
  @Input()
  editBtn;
  @Input()
  deleteBtn;
  @Input()
  detailBtn;

  goBack() {
    this.onBtnClick.emit("back");
  }

  delete() {
    this.onBtnClick.emit("delete");
  }

  edit() {
    this.onBtnClick.emit("edit");
  }

  details() {
    this.onBtnClick.emit("details");
  }
}
