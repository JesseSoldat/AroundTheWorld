import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Store, select } from "@ngrx/store";
import { AppState } from "../../reducers";
import { selectError } from "../friend.selector";
import { selectFriendDetails } from "../_selectors/friend-details.selector";
import { FriendsRequested } from "../friend.actions";
// models
import { Profile } from "../../models/profile.model";

@Component({
  selector: "app-friend-details",
  templateUrl: "./friend-details.component.html",
  styleUrls: ["./friend-details.component.css"]
})
export class FriendDetailsComponent implements OnInit {
  error$: Observable<string>;
  profile$: Observable<Profile>;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {
    this.listenForErrors();
    this.requestProfile();
  }

  // store / api calls
  listenForErrors() {
    this.error$ = this.store.pipe(select(selectError));
  }

  // retry logic
  fetchData() {}

  requestProfile() {
    this.profile$ = this.store.select(selectFriendDetails).pipe(
      tap(details => {
        if (!details) return this.store.dispatch(new FriendsRequested());
        console.log("details", details);
      })
    );
  }
}
