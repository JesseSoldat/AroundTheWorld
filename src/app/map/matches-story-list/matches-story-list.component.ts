import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
// Rxjs
import { Observable } from "rxjs";
import { tap, filter } from "rxjs/operators";
// Ngrx
import { Store, select } from "@ngrx/store";
import { AppState } from "../../reducers";
import { selectOtherPersonsStoryList } from "../story.selector";
// Services
import { StoryService } from "../../services/story.service";

@Component({
  selector: "app-matches-story-list",
  templateUrl: "./matches-story-list.component.html",
  styleUrls: ["./matches-story-list.component.css"]
})
export class MatchesStoryListComponent implements OnInit {
  stories$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private storyService: StoryService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const userId = params.userId;

      this.stories$ = this.store.pipe(
        select(selectOtherPersonsStoryList),
        filter(stories => stories !== null),
        tap(stories => {
          console.log(stories);
        })
      );

      this.storyService
        .getOtherPersonsStories(userId)
        .subscribe(res => {}, err => {});
    });
  }
}
