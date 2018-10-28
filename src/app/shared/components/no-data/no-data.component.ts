import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";

@Component({
  selector: "app-no-data",
  templateUrl: "./no-data.component.html",
  styleUrls: ["./no-data.component.css"]
})
export class NoDataComponent implements OnInit {
  @Output() onBtnClick = new EventEmitter();
  @Input() title: string;
  @Input() text: string;
  @Input() btnIcon: string;
  @Input() btnText: string;

  constructor() {}

  ngOnInit() {}

  onClick() {
    this.onBtnClick.emit();
  }
}


