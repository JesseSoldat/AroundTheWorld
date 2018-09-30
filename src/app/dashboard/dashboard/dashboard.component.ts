import { Component, OnInit } from "@angular/core";
// Rxjs
import { Observable, of } from "rxjs";
// Data
import { cardData } from "./cardData";
// Models
import { DashboardCards } from "../../models/dashboardCards";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  cardData$: Observable<DashboardCards>;

  constructor() {}

  ngOnInit() {
    this.cardData$ = of(cardData);

    //coordinates: [-104.9903, 39.7392];
    // this.storyService
    //   .matchOtherUsers(this.coordinates)
    //   .subscribe(res => {}, err => {});
  }
}
