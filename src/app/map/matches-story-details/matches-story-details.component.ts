import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
// rxjs
import { tap } from "rxjs/operators";
import { Observable, of } from "rxjs";
// ngrx
import { Store, select } from "@ngrx/store";
import { AppState } from "../../reducers";
import { selectOtherPersonsStory } from "../story.selector";
import { OtherPersonsStoriesRequested } from "../story.actions";
import {
  FriendsRequested,
  SendFriendRequestStarted,
  AcceptFriendRequestStarted
} from "../../friend/friend.actions";
import { OpenModal } from "../../core/modals/modal.actions";
import {
  selectFriendOverlay,
  selectFriends
} from "../../friend/friend.selector";
import { selectMatchedUserStatus } from "../_selectors/matches-story-details.selector";
import { selectUserId } from "../../auth/auth.selectors";
// models
import { Profile } from "../../models/profile.model";
import { Story } from "../../models/story.model";
import { Image } from "../../models/image.model";

@Component({
  selector: "app-matches-story-details",
  templateUrl: "./matches-story-details.component.html",
  styleUrls: ["./matches-story-details.component.css"]
})
export class MatchesStoryDetailsComponent implements OnInit {
  overlay$: Observable<boolean>;
  userId$: Observable<string>;
  story$: Observable<Story>;
  friends: Profile[];
  matchedUserId: string;
  storyId: string;

  status = "statusLoading";

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
  }

  // store & api calls
  showOverlay(): void {
    this.overlay$ = this.store.pipe(select(selectFriendOverlay));
  }

  getFriends(): void {
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

  getFriendRequestsStatus(): void {
    this.store
      .select(selectMatchedUserStatus)
      .pipe(
        tap(status => {
          console.log("Status:", status);
          this.status = status;
        })
      )
      .subscribe();
  }

  getMatchedUsersStories(): void {
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
  sendFriendRequest(): void {
    this.store.dispatch(
      new SendFriendRequestStarted({
        friendId: this.matchedUserId,
        storyId: this.storyId
      })
    );
  }

  acceptFriendRequest(): void {
    this.store.dispatch(
      new AcceptFriendRequestStarted({ friendId: this.matchedUserId })
    );
  }

  viewImage(imgObj: Image): void {
    this.store.dispatch(
      new OpenModal({
        modalType: "imageDetails",
        data: { ...imgObj, storyId: this.storyId, type: "matchedUser" }
      })
    );
  }

  goBack(): void {
    this.router.navigateByUrl(`/map/matches/storyList/${this.matchedUserId}`);
  }
}
