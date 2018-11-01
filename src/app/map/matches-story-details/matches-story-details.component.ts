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
  matchedUserId$: Observable<ParamMap>;
  matchedUserId: string;
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
    this.userId$ = this.store.select(selectUserId);

    this.getMatchedUsersStories();

    // check if user is friends
    this.getFriends();
    // check if user received or sent a friend request to the matched user
    // status requested || received
    this.getFriendRequests();

    // this.receivedRequest$ =
    // this.matchedUserId$
    //   .pipe(
    //     switchMap((params: ParamMap) => {
    //       const matchedUserId = params.get("matchedUserId");
    //       return this.userId$.pipe(
    //         tap((userId: string) => {
    //           this.store
    //             .select(
    //               selectReceivedRequestByMatchingUser(matchedUserId, userId)
    //             )
    //             .subscribe(receivedRequest => {
    //               this.receivedRequest = receivedRequest;
    //               console.log("receivedRequest", receivedRequest);
    //             });
    //         })
    //       );
    //     })
    //   )
    //   .subscribe();

    // this.permission$ =
    // this.matchedUserId$
    //   .pipe(
    //     switchMap((params: ParamMap) => {
    //       // return of(null);
    //       return this.store.select(
    //         selectSentFriendRequest(params.get("matchedUserId"))
    //       );
    //     }),
    //     tap(friendRequest => {
    //       if (friendRequest) console.log("sentRequest", friendRequest);
    //       if (friendRequest) return;

    //       this.friendsService.allFriendRequests().subscribe();
    //     })
    //   )
    //   .subscribe();
  }

  // store & api calls
  getFriends() {}

  getFriendRequests() {}

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
  addUserToFriends() {
    console.log(this.matchedUserId);
  }

  goBack() {
    this.router.navigateByUrl(`/map/matches/storyList/${this.matchedUserId}`);
  }
}
