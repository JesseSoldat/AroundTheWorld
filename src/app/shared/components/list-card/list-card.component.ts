import { Component, Input, OnInit } from "@angular/core";
// Models
import { Story } from "../../../models/story.model";
// Data
const distances = "5,10,15,20,50,100,300,500,1000,3000,5000,10000,100000";
@Component({
  selector: "app-list-card",
  templateUrl: "./list-card.component.html",
  styleUrls: ["./list-card.component.css"]
})
export class ListCardComponent implements OnInit {
  @Input()
  data: Story;
  distanceType = "miles";
  distances: string[];
  constructor() {}

  ngOnInit() {
    this.distances = distances.split(",");
  }
}
