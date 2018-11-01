import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
// rxjs
import { switchMap, tap, map } from "rxjs/operators";
import { Observable, of } from "rxjs";
// ngrx
import { Store, select } from "@ngrx/store";
import { AppState } from "../../reducers";
import { selectOtherPersonsStory } from "../story.selector";
import { OtherPersonsStoriesRequested } from "../story.actions";
import { FriendsRequested } from "../../friend/friend.actions";
import {
  selectFriends,
  selectMatchedUserStatus
} from "../../friend/friend.selector";
import { selectUserId } from "../../auth/auth.selectors";
// models
import { Profile } from "../../models/profile.model";
import { Story } from "../../models/story.model";

@Component({
  selector: "app-matches-story-details",
  templateUrl: "./matches-story-details.component.html",
  styleUrls: ["./matches-story-details.component.css"]
})
export class MatchesStoryDetailsComponent implements OnInit {
  story$: Observable<Story>;
  friends: Profile[];
  matchedUserId: string;
  storyId: string;
  userId$: Observable<string>;

  status$ = of("statusLoading");
  receivedRequest;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      // get ids
      this.userId$ = this.store.select(selectUserId);
      this.matchedUserId = params.get("matchedUserId");
      this.storyId = params.get("storyId");

      // store & api calls
      this.getMatchedUsersStories();
      // check if user is friends
      this.getFriends();
      // check if user received or sent a friend request to the matched user
      // status requested || received
      this.getFriendRequestsStatus();
    });
  }

  // store & api calls
  getFriends() {
    this.store
      .pipe(
        select(selectFriends),
        tap(friends => {
          if (!friends) return this.store.dispatch(new FriendsRequested());
          this.friends = friends;
        })
      )
      .subscribe();
  }

  getFriendRequestsStatus() {
    this.status$ = this.userId$.pipe(
      switchMap((userId: string) =>
        this.store
          .select(selectMatchedUserStatus(this.matchedUserId, userId))
          .pipe(
            tap(status => {
              console.log("Status:", status);
            })
          )
      )
    );
  }

  getMatchedUsersStories() {
    this.story$ = this.store.pipe(
      select(selectOtherPersonsStory(this.storyId)),
      tap(story => {
        if (story) return;
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
  addUserToFriends() {
    console.log(this.matchedUserId);
  }

  goBack() {
    this.router.navigateByUrl(`/map/matches/storyList/${this.matchedUserId}`);
  }
}
