import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
// rxjs
import { switchMap, tap } from "rxjs/operators";
import { Observable } from "rxjs";
// ngrx
import { Store } from "@ngrx/store";
import { AppState } from "../../reducers";
import { selectOtherPersonsStory } from "../story.selector";
import { OtherPersonsStoriesRequested } from "../story.actions";
import {
  selectSentFriendRequest,
  selectReceivedRequestByMatchingUser
} from "../../friend/friend.selector";
import { selectUserId } from "../../auth/auth.selectors";
// services
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
  matchedUserId$: Observable<ParamMap>;
  userId$: Observable<string>;
  receivedRequest;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private friendsService: FriendService
  ) {}

  ngOnInit() {
    this.matchedUserId$ = this.route.paramMap;

    this.getMatchedUsersStories();

    // check if friend
    const isFriend = false;
    if (isFriend) {
      // TODO user friends selector pass matchedUser id
      return;
    }

    // check for friends request status requested || received
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
  addUserToFriends(receivedRequest) {
    console.log(receivedRequest);
  }
  goBack() {
    this.router.navigateByUrl(`/map/matches/storyList/${this.matchedUserId}`);
  }
}
