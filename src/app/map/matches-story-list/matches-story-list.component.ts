import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
// Rxjs
import { Observable, of } from "rxjs";
import { tap, first, switchMap } from "rxjs/operators";
// Ngrx
import { Store } from "@ngrx/store";
import { AppState } from "../../reducers";
import { selectOtherPersonsStoryList } from "../story.selector";
// Services
import { StoryService } from "../../services/story.service";

@Component({
  selector: "app-matches-story-list",
  templateUrl: "./matches-story-list.component.html",
  styleUrls: ["./matches-story-list.component.css"]
})
export class MatchesStoryListComponent implements OnInit, OnDestroy {
  stories$: Observable<any>;
  matchedUserId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private storyService: StoryService
  ) {}

  ngOnInit() {
    this.stories$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.matchedUserId = params.get("matchedUserId");
        //return of([]);
        return this.store.select(selectOtherPersonsStoryList);
      }),
      tap(stories => {
        if (stories !== null) {
          console.log("matched user stories", stories);
          // Check that we have the correct match in the store
          if (this.matchedUserId === stories[0].user._id) return;
        }

        this.storyService
          .getOtherPersonsStories(this.matchedUserId)
          .pipe(
            first(),
            tap(() => console.log("Fetching Stories from Server"))
          )
          .subscribe(res => {}, err => {});
      })
    );
  }

  ngOnDestroy() {
    console.log("OnDestroy: matches story list");
  }

  navigate(ids) {
    const { userId, storyId } = ids;
    this.router.navigateByUrl(`map/matches/storyDetails/${userId}/${storyId}`);
  }
}
