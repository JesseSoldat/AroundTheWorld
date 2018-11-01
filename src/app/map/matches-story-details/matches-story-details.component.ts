import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
// rxjs
import { switchMap, tap } from "rxjs/operators";
import { Observable } from "rxjs";
// ngrx
import { Store, select } from "@ngrx/store";
import { AppState } from "../../reducers";
import { selectOtherPersonsStory } from "../story.selector";
import { OtherPersonsStoriesRequested } from "../story.actions";
import { FriendsRequested } from "../../friend/friend.actions";
import {
  selectFriends,
  selectSentFriendRequest,
  selectReceivedRequestByMatchingUser
} from "../../friend/friend.selector";
import { selectUserId } from "../../auth/auth.selectors";
// services
import { FriendService } from "../../services/friend.service";
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

  status = "statusLoading";
  receivedRequest;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private friendsService: FriendService
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
      this.getFriendRequests();
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

  getFriendRequests() {
    // get any request that was received from matching user
    this.userId$
      .pipe(
        tap((userId: string) => {
          this.store
            .select(
              selectReceivedRequestByMatchingUser(this.matchedUserId, userId)
            )
            .pipe(
              tap(receivedFromMatchingUser => {
                console.log(
                  "receivedFromMatchingUser",
                  receivedFromMatchingUser
                );
              })
            )
            .subscribe();
        })
      )
      .subscribe();

    // check if user already sent a request
    this.store
      .select(selectSentFriendRequest(this.matchedUserId))
      .pipe(
        tap(sentFriendRequest => {
          console.log("sentFriendRequest", sentFriendRequest);
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
  addUserToFriends() {
    console.log(this.matchedUserId);
  }

  goBack() {
    this.router.navigateByUrl(`/map/matches/storyList/${this.matchedUserId}`);
  }
}
