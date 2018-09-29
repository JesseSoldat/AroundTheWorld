import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
// Rxjs
import { of, Observable } from "rxjs";
// Models
import { Location } from "../../models/location.model";

@Component({
  selector: "app-add-map-story",
  templateUrl: "./add-map-story.component.html",
  styleUrls: ["./add-map-story.component.css"]
})
export class AddMapStoryComponent implements OnInit {
  location: Location;
  marker: Location;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log("params", params);
      this.location = {
        lat: parseFloat(params.lat),
        lng: parseFloat(params.lng)
      };
      this.marker = this.location;
    });
  }

  // Events & Cbs
  onSetMarker(event) {
    this.marker = event.coords;
  }

  onCancel() {
    this.router.navigateByUrl("/dashboard");
  }

  handleSubmit(e) {
    console.log("test", e);
  }
}
