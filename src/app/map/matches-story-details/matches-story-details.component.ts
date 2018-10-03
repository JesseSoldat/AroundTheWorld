import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
// Rxjs
import { switchMap, tap, first } from "rxjs/operators";
import { Observable } from "rxjs";
// Ngrx
import { Store } from "@ngrx/store";
import { AppState } from "../../reducers";
import { selectOtherPersonsStory } from "../story.selector";
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
  matchedUserId: string;
  userId: string;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private storyService: StoryService,
    private friendsService: FriendService
  ) {}

  ngOnInit() {
    this.story$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.userId = params.get("userId");
        return this.store.select(
          selectOtherPersonsStory(params.get("storyId"))
        );
      }),
      tap(story => {
        if (story) console.log("Have Story", story);
        if (story) {
          return (this.matchedUserId = story.user._id);
        }

        this.storyService
          .getOtherPersonsStories(this.userId)
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

    this.friendsService.allFriendRequests().subscribe();
  }

  // Events & Cbs
  sendFriendRequest() {
    this.friendsService
      .sendFriendRequest(this.matchedUserId)
      .subscribe(res => {}, err => {});
  }
}
