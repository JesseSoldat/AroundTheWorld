import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
// rxjs
import { Observable } from "rxjs";
import { tap, switchMap } from "rxjs/operators";
// ngrx
import { Store } from "@ngrx/store";
import { AppState } from "../../reducers";
import { selectOtherPersonsStoryList } from "../story.selector";
import { OtherPersonsStoriesRequested } from "../story.actions";

@Component({
  selector: "app-matches-story-list",
  templateUrl: "./matches-story-list.component.html",
  styleUrls: ["./matches-story-list.component.css"]
})
export class MatchesStoryListComponent implements OnInit {
  stories$: Observable<any>;
  matchedUserId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.getStories();
  }

  // store & api calls
  getStories() {
    this.stories$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.matchedUserId = params.get("matchedUserId");
        return this.store.select(selectOtherPersonsStoryList);
      }),
      tap(stories => {
        if (stories !== null) {
          // check that we have the correct match in the store
          if (this.matchedUserId === stories[0].user._id) return;
        }
        // request from api
        this.store.dispatch(
          new OtherPersonsStoriesRequested({
            matchedUserId: this.matchedUserId
          })
        );
      })
    );
  }

  // events & cbs
  navigate(ids) {
    const { userId, storyId } = ids;
    this.router.navigateByUrl(`map/matches/storyDetails/${userId}/${storyId}`);
  }
}
