import { Component, OnInit } from "@angular/core";
// Rxjs
import { Observable } from "rxjs";
import { tap, first } from "rxjs/operators";
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
      tap((storyList: Story[]) => {
        // Fetch From Store tap returns storyList by default
        if (storyList !== null) {
          return this.createCoordinatesById(storyList);
        }
        // Fetch From Server
        this.fetchStoriesFromTheApi();
      })
    );
  }

  // Api Calls
  fetchStoriesFromTheApi() {
    this.storyService
      .getMyStories()
      .pipe(tap(() => console.log("Fetching Stories from Server")))
      .subscribe(
        res => {
          // console.log("subscribe @story-list");
        },
        err => {},
        () => {
          // console.log("complete @story-list");
        }
      );
  }

  //  longitude then latitude
  // _id:  [-102.49943998023224, 41.025723223004135]
  createCoordinatesById(storyList) {
    const coordinatesById: CoordinatesById = {};
    storyList.forEach(story => {
      coordinatesById[story._id] = story.geometry.coordinates;
    });

    this.coordinatesById = coordinatesById;
  }

  // Events & Cbs
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
