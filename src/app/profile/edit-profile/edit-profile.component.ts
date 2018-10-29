import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Store, select } from "@ngrx/store";
import { selectProfile } from "../profile.selector";
import { AppState } from "../../reducers";
// models
import { Profile } from "../../models/profile.model";
import { ProfileService } from "src/app/services/profile.service";

@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.css"]
})
export class EditProfileComponent implements OnInit {
  profile$: Observable<Profile>;
  profileForm: FormGroup;
  formType: string = "basic";
  // form errors
  controlNameErrs = {
    username: null
  };

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private profileService: ProfileService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getProfile();
    this.initializeForm();
  }

  initializeForm() {
    this.profileForm = this.formBuilder.group({
      username: new FormControl("", [Validators.required]),
      hometown: new FormControl(""),
      gender: new FormControl(""),
      occupation: new FormControl(""),
      about: new FormControl("")
    });
  }

  getProfile() {
    this.profile$ = this.store.pipe(
      select(selectProfile),
      tap(profile => {
        if (!profile) return this.profileService.getProfile().subscribe();
      })
    );
  }

  navToProfile() {
    this.router.navigateByUrl("/profile");
  }
}
