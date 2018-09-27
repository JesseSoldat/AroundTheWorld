import { Component, OnInit, Input } from "@angular/core";

import linkMap from "./linkMap";

@Component({
  selector: "app-link",
  templateUrl: "./link.component.html",
  styleUrls: ["./link.component.css"]
})
export class LinkComponent implements OnInit {
  @Input()
  text: string;
  link: string;

  constructor() {}

  ngOnInit() {
    this.link = linkMap[this.text.toLowerCase()];
  }
}
