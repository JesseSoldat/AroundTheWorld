import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { tap, first } from "rxjs/operators";
import { Store, select } from "@ngrx/store";
import { AppState } from "../../reducers";
import { selectProfile } from "../profile.selector";
import { ProfileRequested } from "../profile.actions";
// models
import { Profile } from "../../models/profile.model";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  profile$: Observable<Profile>;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {
    this.requestProfile();
  }

  requestProfile() {
    this.profile$ = this.store.pipe(
      select(selectProfile),
      tap(profile => {
        if (!profile) this.store.dispatch(new ProfileRequested());
      })
    );
  }

  editProfile() {
    this.router.navigateByUrl("/profile/edit");
  }
}
