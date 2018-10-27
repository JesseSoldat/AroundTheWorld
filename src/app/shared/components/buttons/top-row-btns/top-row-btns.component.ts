import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-top-row-btns",
  templateUrl: "./top-row-btns.component.html",
  styleUrls: ["./top-row-btns.component.css"]
})
export class TopRowBtnsComponent {
  @Output()
  onBtnClick: EventEmitter<string> = new EventEmitter();
  @Input()
  backBtn;
  @Input()
  editBtn;
  @Input()
  deleteBtn;

  goBack() {
    this.onBtnClick.emit("back");
  }

  delete() {
    this.onBtnClick.emit("delete");
  }

  edit() {
    this.onBtnClick.emit("edit");
  }
}
