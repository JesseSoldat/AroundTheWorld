import { Component, OnInit } from "@angular/core";
// Rxjs
import { Observable } from "rxjs";
import { tap, filter } from "rxjs/operators";
// Ngrx
import { Store, select } from "@ngrx/store";
import { AppState } from "../../reducers";
import { selectStoryList } from "../story.selector";
// Services
import { StoryService } from "../../services/story.service";
// Models
import { Story } from "../../models/story.model";

interface SearchDistance {
  storyId;
  string;
  distances: string;
  distanceType: string;
}

interface CoordinatesById {
  [key: string]: number[];
}

@Component({
  selector: "app-story-list",
  templateUrl: "./story-list.component.html",
  styleUrls: ["./story-list.component.css"]
})
export class StoryListComponent implements OnInit {
  stories$: Observable<Story[]>;
  coordinatesById: CoordinatesById;

  constructor(
    private store: Store<AppState>,
    private storyService: StoryService
  ) {}

  ngOnInit() {
    this.stories$ = this.store.pipe(
      select(selectStoryList),
      filter(storyList => storyList !== null),
      tap((storyList: Story[]) => {
        // console.log("storyList", storyList);
        const coordinatesById: CoordinatesById = {};
        storyList.forEach(story => {
          coordinatesById[story._id] = story.geometry.coordinates;
        });

        this.coordinatesById = coordinatesById;
        // console.log(this.coordinatesById);
      })
    );
    this.storyService.getMyStories().subscribe(res => {}, err => {});
  }

  onHandleSubmit(form: SearchDistance) {
    const coordinates = this.coordinatesById[form.storyId];

    const matchQuery = {
      coordinates,
      maxDistance: form.distances,
      unit: form.distanceType
    };

    this.storyService
      .matchOtherUsers(matchQuery)
      .subscribe(res => {}, err => {});
  }
}
