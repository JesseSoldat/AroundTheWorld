import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
// Rxjs
import { switchMap, tap, first, shareReplay } from "rxjs/operators";
import { Observable, of } from "rxjs";
// Ngrx
import { Store } from "@ngrx/store";
import { AppState } from "../../reducers";
import { selectOtherPersonsStory } from "../story.selector";
import {
  selectSentFriendRequest,
  selectReceivedRequestByMatchingUser
} from "../../friend/friend.selector";
import { selectUserId } from "../../auth/auth.selectors";
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
  matchedUserId: string; // TEMP using for the go back btn

  matchedUserId$: Observable<ParamMap>;
  userId$: Observable<string>;
  receivedRequest;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private storyService: StoryService,
    private friendsService: FriendService
  ) {}

  ngOnInit() {
    this.matchedUserId$ = this.route.paramMap;

    this.getMatchedUsersStories();

    // Check if Friend
    const isFriend = false;
    if (isFriend) {
      // TODO user friends selector pass matchedUser id
      return;
    }

    // Check for Friends Request Status Requested || Received
    this.userId$ = this.store.select(selectUserId);
    // this.receivedRequest$ =
    this.matchedUserId$
      .pipe(
        switchMap((params: ParamMap) => {
          const matchedUserId = params.get("matchedUserId");
          return this.userId$.pipe(
            tap((userId: string) => {
              console.log(matchedUserId);

              this.store
                .select(
                  selectReceivedRequestByMatchingUser(matchedUserId, userId)
                )
                .subscribe(receivedRequest => {
                  this.receivedRequest = receivedRequest;
                  console.log("receivedRequest", receivedRequest);
                });
            })
          );
        })
      )
      .subscribe();

    // this.permission$ =
    this.matchedUserId$
      .pipe(
        switchMap((params: ParamMap) => {
          // return of(null);
          return this.store.select(
            selectSentFriendRequest(params.get("matchedUserId"))
          );
        }),
        tap(friendRequest => {
          if (friendRequest) console.log("sentRequest", friendRequest);
          if (friendRequest) return;

          this.friendsService.allFriendRequests().subscribe();
        })
      )
      .subscribe();
  }

  getMatchedUsersStories() {
    this.story$ = this.matchedUserId$.pipe(
      switchMap((params: ParamMap) => {
        this.matchedUserId = params.get("matchedUserId");
        return this.store.select(
          selectOtherPersonsStory(params.get("storyId"))
        );
      }),
      tap(story => {
        // if (story) console.log("Have Story", story);
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
  }

  // Events & Cbs
  addUserToFriends(receivedRequest) {
    console.log(receivedRequest);
  }
  goBack() {
    this.router.navigateByUrl(`/map/matches/storyList/${this.matchedUserId}`);
  }
}
