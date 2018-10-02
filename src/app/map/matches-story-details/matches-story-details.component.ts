import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
// Rxjs
import { switchMap, mergeMap, tap, first } from "rxjs/operators";
import { Observable } from "rxjs";
// Ngrx
import { Store, select } from "@ngrx/store";
import { AppState } from "../../reducers";
import { selectOtherPersonsStory } from "../story.selector";
// Services
import { StoryService } from "../../services/story.service";

@Component({
  selector: "app-matches-story-details",
  templateUrl: "./matches-story-details.component.html",
  styleUrls: ["./matches-story-details.component.css"]
})
export class MatchesStoryDetailsComponent implements OnInit {
  story$: Observable<any>;
  userId: string;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private storyService: StoryService
  ) {}

  ngOnInit() {
    this.story$ = this.route.params.pipe(
      switchMap((params: Params) => {
        this.userId = params.userId;
        return this.store.select(selectOtherPersonsStory(params.storyId));
      }),
      tap(story => {
        if (story) console.log("Have Story", story);

        if (story === null) {
          console.log("Fetching Stories from Server");
          this.storyService
            .getOtherPersonsStories(this.userId)
            .pipe(first())
            .subscribe(
              res => {
                console.log("Subscribed @matches-story-details");
              },
              err => {}
            );
        }
        return story;
      })
    );
  }
}
