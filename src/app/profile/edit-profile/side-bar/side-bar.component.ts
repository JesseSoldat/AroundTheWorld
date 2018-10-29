import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import buttonFields from "./buttonFields";

@Component({
  selector: "app-side-bar",
  templateUrl: "./side-bar.component.html",
  styleUrls: ["./side-bar.component.css"]
})
export class SideBarComponent implements OnInit {
  @Output()
  changeFormType: EventEmitter<string> = new EventEmitter();
  buttonFields = buttonFields;
  currentForm = "basic";

  constructor() {}

  ngOnInit() {}

  onChangeFormType(type) {
    this.currentForm = type;
    this.changeFormType.emit(type);
  }
}
