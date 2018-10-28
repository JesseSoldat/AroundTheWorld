import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

@Component({
  selector: "app-overlay",
  templateUrl: "./overlay.component.html",
  styleUrls: ["./overlay.component.css"]
})
export class OverlayComponent implements OnInit {
  showOverlay: Observable<boolean>;
  constructor() {}

  ngOnInit() {}
}
