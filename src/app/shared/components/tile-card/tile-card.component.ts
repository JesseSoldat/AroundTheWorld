import { Component, Input, OnInit } from "@angular/core";
// Models
import { DashboardCard } from "../../../models/dashboardCard";

@Component({
  selector: "app-tile-card",
  templateUrl: "./tile-card.component.html",
  styleUrls: ["./tile-card.component.css"]
})
export class TileCardComponent implements OnInit {
  @Input()
  data: DashboardCard;

  constructor() {}

  ngOnInit() {}
}
