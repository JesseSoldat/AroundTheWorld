import { Component, OnInit } from "@angular/core";
// Services
import { StoryService } from "../../services/story.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  coordinates: [-104.9903, 39.7392];

  constructor(private storyService: StoryService) {}

  ngOnInit() {
    this.storyService
      .matchOtherUsers(this.coordinates)
      .subscribe(res => {}, err => {});
  }
}
