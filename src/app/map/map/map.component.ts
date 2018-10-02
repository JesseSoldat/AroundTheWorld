import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

// Models
import { Location } from "../../models/location.model";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"]
})
export class MapComponent implements OnInit {
  location: Location = {
    lng: -84.296312,
    lat: 33.774828
  };

  marker: Location;
  locationIsSet = false;

  constructor(private router: Router) {}

  ngOnInit() {}

  onSetMarker(event) {
    console.log(event);

    this.marker = event.coords;
  }

  onSetLocation() {
    this.router.navigate(["map/addMapStory", this.marker]);
  }

  onCancel() {
    this.router.navigateByUrl("/dashboard");
  }
}
