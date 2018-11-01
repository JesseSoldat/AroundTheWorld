import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
// rxjs
import { switchMap, tap } from "rxjs/operators";
import { Observable, of } from "rxjs";
// ngrx
import { Store, select } from "@ngrx/store";
import { AppState } from "../../reducers";
import { selectOtherPersonsStory } from "../story.selector";
import { OtherPersonsStoriesRequested } from "../story.actions";
import {
  FriendsRequested,
  SendFriendRequestStarted
} from "../../friend/friend.actions";
import {
  selectFriendOverlay,
  selectFriendRequests, // temp
  selectFriends,
  selectMatchedUserStatus
} from "../../friend/friend.selector";
import { selectUserId } from "../../auth/auth.selectors";
import { selectMatchesStoryDetailsUserId } from "../story.selector";
// models
import { Profile } from "../../models/profile.model";
import { Story } from "../../models/story.model";

@Component({
  selector: "app-matches-story-details",
  templateUrl: "./matches-story-details.component.html",
  styleUrls: ["./matches-story-details.component.css"]
})
export class MatchesStoryDetailsComponent implements OnInit {
  overlay$: Observable<boolean>;
  story$: Observable<Story>;
  friends: Profile[];
  matchedUserId: string;
  storyId: string;
  userId$: Observable<string>;

  status$ = of("statusLoading");
  status = "statusLoading";
  receivedRequest;

  // temp
  prevFriendReq = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.showOverlay();

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
      this.getFriendRequestsStatus();
    });

    // ------------------------ temp ---------------------
    this.store
      .select(selectMatchesStoryDetailsUserId)
      .pipe(
        tap(state => {
          console.log("router", state);
        })
      )
      .subscribe();
    // this.store
    //   .select(selectFriendRequests)
    //   .pipe(
    //     tap(req => {
    //       console.log("prev friend req", this.prevFriendReq);
    //       console.log("current friend req", req);
    //       if (this.prevFriendReq !== req) {
    //         this.prevFriendReq = req;
    //         this.getFriendRequestsStatus();
    //       }
    //     })
    //   )
    //   .subscribe();
  }

  // store & api calls
  showOverlay() {
    this.overlay$ = this.store.pipe(select(selectFriendOverlay));
  }

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
    this.store
      .select(selectMatchedUserStatus(this.matchedUserId))
      .pipe(
        tap(status => {
          console.log("Status:", status);
          this.status = status;
        })
      )
      .subscribe();
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
  sendFriendRequest() {
    this.store.dispatch(
      new SendFriendRequestStarted({
        friendId: this.matchedUserId,
        storyId: this.storyId
      })
    );
  }

  goBack() {
    this.router.navigateByUrl(`/map/matches/storyList/${this.matchedUserId}`);
  }
}
