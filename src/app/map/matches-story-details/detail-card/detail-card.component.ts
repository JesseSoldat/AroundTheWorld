import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-detail-card",
  templateUrl: "./detail-card.component.html",
  styleUrls: ["./detail-card.component.css"]
})
export class DetailCardComponent implements OnInit {
  @Input()
  data;
  location = {};

  constructor() {}

  ngOnInit() {
    const { coordinates } = this.data.geometry;
    this.location["lat"] = coordinates[1];
    this.location["lng"] = coordinates[0];
  }
}
