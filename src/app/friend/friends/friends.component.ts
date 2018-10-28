import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
// ngrx
import { Store, select } from "@ngrx/store";
import { AppState } from "../../reducers";
import { selectFriends } from "../friend.selector";
// services
import { FriendService } from "../../services/friend.service";
// models
import { Profile } from "../../models/profile.model";

@Component({
  selector: "app-friends",
  templateUrl: "./friends.component.html",
  styleUrls: ["./friends.component.css"]
})
export class FriendsComponent implements OnInit {
  friends$: Observable<Profile[]>;

  constructor(
    private friendService: FriendService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit() {
    this.getFriends();
  }

  getFriends() {
    this.friends$ = this.store.pipe(
      select(selectFriends),
      tap(friends => {
        if (!friends) this.friendService.getFriends().subscribe();
      })
    );
  }

  // cbs & events
  navigateToStoryList() {
    this.router.navigateByUrl("/map/storyList");
  }
}
