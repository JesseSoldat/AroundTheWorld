import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
// Rxjs
import { switchMap, tap, first } from "rxjs/operators";
import { Observable, of } from "rxjs";
// Ngrx
import { Store } from "@ngrx/store";
import { AppState } from "../../reducers";
import { selectOtherPersonsStory } from "../story.selector";
import { selectSentFriendRequest } from "../../friend/friend.selector";

// Services
import { StoryService } from "../../services/story.service";
import { FriendService } from "../../services/friend.service";

@Component({
  selector: "app-matches-story-details",
  templateUrl: "./matches-story-details.component.html",
  styleUrls: ["./matches-story-details.component.css"]
})
export class MatchesStoryDetailsComponent implements OnInit {
  story$: Observable<any>;
  permission$: Observable<any>;
  matchedUserId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private storyService: StoryService,
    private friendsService: FriendService
  ) {}

  ngOnInit() {
    this.story$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.matchedUserId = params.get("userId");
        return this.store.select(
          selectOtherPersonsStory(params.get("storyId"))
        );
      }),
      tap(story => {
        if (story) console.log("Have Story", story);
        if (story) return;

        this.storyService
          .getOtherPersonsStories(this.matchedUserId)
          .pipe(
            first(),
            tap(() => console.log("Fetching Stories from Server"))
          )
          .subscribe(
            res => {
              // console.log("Subscribed @matches-story-details");
            },
            err => {}
          );
      })
    );

    this.permission$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        // return of(null);
        return this.store.select(selectSentFriendRequest(params.get("userId")));
      }),
      tap(friendRequest => {
        if (friendRequest) console.log("Have Friend Request", friendRequest);
        if (friendRequest) return;

        this.friendsService.allFriendRequests().subscribe();
      })
    );
  }

  // Events & Cbs
  goBack() {
    this.router.navigateByUrl(`/map/matches/storyList/${this.matchedUserId}`);
  }
}
