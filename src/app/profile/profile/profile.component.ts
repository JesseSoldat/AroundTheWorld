import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Store, select } from "@ngrx/store";
import { AppState } from "../../reducers";
import { selectError, selectProfile } from "../profile.selector";
import { ProfileRequested } from "../profile.actions";
// models
import { Profile } from "../../models/profile.model";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
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
  fetchData() {
    this.store.dispatch(new ProfileRequested());
  }

  requestProfile() {
    this.profile$ = this.store.pipe(
      select(selectProfile),
      tap(profile => {
        if (!profile) this.store.dispatch(new ProfileRequested());
      })
    );
  }

  // cbs
  editProfile() {
    this.router.navigateByUrl("/profile/edit");
  }
}
