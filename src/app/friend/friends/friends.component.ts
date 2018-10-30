import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
// ngrx
import { Store, select } from "@ngrx/store";
import { AppState } from "../../reducers";
import { selectError, selectFriends } from "../friend.selector";
import { FriendsRequested } from "../friend.actions";
// models
import { Profile } from "../../models/profile.model";

@Component({
  selector: "app-friends",
  templateUrl: "./friends.component.html",
  styleUrls: ["./friends.component.css"]
})
export class FriendsComponent implements OnInit {
  error$: Observable<string>;
  friends$: Observable<Profile[]>;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {
    this.listenForErrors();
    this.requestFriends();
  }

  // store / api calls
  listenForErrors() {
    this.error$ = this.store.pipe(select(selectError));
  }

  // retry logic
  fetchData() {
    this.store.dispatch(new FriendsRequested());
  }

  requestFriends() {
    this.friends$ = this.store.pipe(
      select(selectFriends),
      tap(friends => {
        if (!friends) this.store.dispatch(new FriendsRequested());
      })
    );
  }

  // cbs & events
  navigateToStoryList() {
    this.router.navigateByUrl("/map/storyList");
  }
}
