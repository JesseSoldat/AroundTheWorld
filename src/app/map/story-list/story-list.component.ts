import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
// rxjs
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
// ngrx
import { Store, select } from "@ngrx/store";
import { AppState } from "../../reducers";
import { selectStoryList } from "../story.selector";
import { MyStoriesRequested, MatchOtherUsersStarted } from "../story.actions";
// models
import { Story } from "../../models/story.model";
import { MatchQuery } from "../..//models/match-query.model";

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

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {
    this.fetchStories();
  }

  // store & api calls
  fetchStories() {
    this.stories$ = this.store.pipe(
      select(selectStoryList),
      tap((storyList: Story[]) => {
        // fetch from store tap returns storyList by default
        if (storyList !== null) {
          return this.createCoordinatesById(storyList);
        }
        // fetch from server
        this.store.dispatch(new MyStoriesRequested());
      })
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
    this.router.navigateByUrl("/map");
  }

  searchForFriendsByDistance(form: SearchDistance) {
    const coordinates = this.coordinatesById[form.storyId];

    const matchQuery: MatchQuery = {
      coordinates,
      maxDistance: parseInt(form.distances),
      unit: form.distanceType
    };

    this.store.dispatch(new MatchOtherUsersStarted({ matchQuery }));
  }
}
