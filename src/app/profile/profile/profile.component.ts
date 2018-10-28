import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Store, select } from "@ngrx/store";
import { AppState } from "../../reducers";
import { selectProfile } from "../profile.selector";
// models
import { Profile } from "../../models/profile.model";
// services
import { ProfileService } from "../../services/profile.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  profile$: Observable<Profile>;

  constructor(
    private store: Store<AppState>,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.profile$ = this.store.pipe(
      select(selectProfile),
      tap(profile => {
        if (!profile) return this.profileService.getProfile().subscribe();
      })
    );
  }
}
