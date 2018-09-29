import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  staticMap =
    "https://maps.googleapis.com/maps/api/staticmap?center=Berkeley,CA&zoom=14&size=400x400&key=AIzaSyBqBYYfTpbE6RW2DDTUsws1zVV35OK2m3Y";

  marker =
    "https://maps.googleapis.com/maps/api/staticmap?center=newYork,NY&zoom=14&size=400x400&key=AIzaSyBqBYYfTpbE6RW2DDTUsws1zVV35OK2m3Y";

  staticMap2 =
    "https://maps.googleapis.com/maps/api/staticmap?center=40.714728,-73.998672&zoom=14&size=400x400&key=AIzaSyBqBYYfTpbE6RW2DDTUsws1zVV35OK2m3Y";
  constructor() {}

  ngOnInit() {}
}
