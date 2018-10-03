import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
// Rxjs
import { switchMap, tap } from "rxjs/operators";
import { Observable } from "rxjs";
// Ngrx
import { Store, select } from "@ngrx/store";
import { AppState } from "../../reducers";
import { selectStory } from "../story.selector";
// Services
import { StoryService } from "../../services/story.service";

@Component({
  selector: "app-story-details",
  templateUrl: "./story-details.component.html",
  styleUrls: ["./story-details.component.css"]
})
export class StoryDetailsComponent implements OnInit {
  story$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private storyService: StoryService
  ) {}

  ngOnInit() {
    this.story$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const storyId = params.get("storyId");
        return this.store.select(selectStory(storyId));
      }),
      tap(story => {
        if (story) {
          console.log("Have Story", story);
        }
        if (story) return;

        this.storyService
          .getMyStories()
          .pipe(tap(() => console.log("Fetching Stories from Server")))
          .subscribe();
      })
    );
  }

  // Events & Cbs
  viewImage(image) {
    console.log(image);
  }
}
