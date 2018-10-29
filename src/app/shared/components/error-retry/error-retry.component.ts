import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";

@Component({
  selector: "app-error-retry",
  templateUrl: "./error-retry.component.html",
  styleUrls: ["./error-retry.component.css"]
})
export class ErrorRetryComponent implements OnInit {
  @Output()
  fetchData = new EventEmitter();
  @Input()
  msg: string;

  ngOnInit() {}

  onFetchData() {
    this.fetchData.emit();
  }
}
