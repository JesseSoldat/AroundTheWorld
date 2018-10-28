import { Component, Output, EventEmitter, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-heading",
  templateUrl: "./heading.component.html",
  styleUrls: ["./heading.component.css"]
})
export class HeadingComponent implements OnInit {
  @Input()
  heading: string;
  @Input()
  backBtn;
  @Input()
  editBtn;
  @Input()
  deleteBtn;
  @Input()
  detailBtn;

  @Output()
  btnClick: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onBtnClick($event) {
    this.btnClick.emit($event);
  }
}
