import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
// rxjs
import { Observable } from "rxjs";
import { tap, first } from "rxjs/operators";
// ngrx
import { Store, select } from "@ngrx/store";
import { AppState } from "../../reducers";
import { selectStoryList } from "../story.selector";
// services
import { StoryService } from "../../services/story.service";
// models
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
    private storyService: StoryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.stories$ = this.store.pipe(
      select(selectStoryList),
      tap((storyList: Story[]) => {
        // fetch from store tap returns storyList by default
        if (storyList !== null) {
          return this.createCoordinatesById(storyList);
        }
        // fetch from server
        this.fetchStoriesFromTheApi();
      })
    );
  }

  // api calls
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

  // events & cbs
  navigateToMap() {
    this.router.navigateByUrl('/map')
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
