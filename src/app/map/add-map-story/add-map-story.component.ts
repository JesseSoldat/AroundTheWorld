import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
// ngrx
import { Store, select } from "@ngrx/store";
import { AppState } from "../../reducers";
import { selectStoryOverlay } from "../story.selector";
// models
import { Location } from "../../models/location.model";
import { Story } from "../../models/story.model";
// services
import { StoryService } from "../../services/story.service";

@Component({
  selector: "app-add-map-story",
  templateUrl: "./add-map-story.component.html",
  styleUrls: ["./add-map-story.component.css"]
})
export class AddMapStoryComponent implements OnInit {
  overlay$: Observable<boolean>;
  location: Location;
  marker: Location;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private storyService: StoryService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.location = {
        lng: parseFloat(params.lng),
        lat: parseFloat(params.lat)
      };
      this.marker = this.location;
    });

    this.showOverlay();
  }

  showOverlay() {
    this.overlay$ = this.store.pipe(select(selectStoryOverlay));
  }

  // Events & Cbs
  onSetMarker(event) {
    this.marker = event.coords;
  }

  onCancel() {
    this.router.navigateByUrl("/dashboard");
  }

  handleSubmit(form) {
    const { lng, lat } = this.location;

    const story: Story = {
      title: form.title,
      description: form.description,
      geometry: {
        type: "Point",
        coordinates: [lng, lat]
      }
    };

    this.storyService.createNewStory(story).subscribe(res => {}, err => {});
  }
}
