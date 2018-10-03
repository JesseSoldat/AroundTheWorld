import { Component, OnInit } from "@angular/core";
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
export class MatchesStoryListComponent implements OnInit {
  stories$: Observable<any>;
  userId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private storyService: StoryService
  ) {}

  ngOnInit() {
    this.stories$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.userId = params.get("userId");
        //return of([]);
        return this.store.select(selectOtherPersonsStoryList);
      }),
      tap(stories => {
        if (stories !== null) return;

        this.storyService
          .getOtherPersonsStories(this.userId)
          .pipe(
            first(),
            tap(() => console.log("Fetching Stories from Server"))
          )
          .subscribe(res => {}, err => {});
      })
    );
  }

  navigate(ids) {
    const { userId, storyId } = ids;
    this.router.navigateByUrl(`map/matches/storyDetails/${userId}/${storyId}`);
  }
}
