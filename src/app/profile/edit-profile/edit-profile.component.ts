import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";
import { Store, select } from "@ngrx/store";
import { selectProfile } from "../profile.selector";
import { AppState } from "../../reducers";
// models
import { Profile } from "../../models/profile.model";
import { ProfileService } from "../../services/profile.service";
import { InputGroup } from "../../models/input-group.model";

// data
import { profileFormGroupData } from "./profileFormGroupData";

@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.css"]
})
export class EditProfileComponent implements OnInit {
  profile$: Observable<Profile>;
  formGroupData$: Observable<InputGroup> = null;
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
    this.formGroupData$ = of(profileFormGroupData);
    this.getProfile();
    this.initializeForm();
  }

  // store / api calls
  getProfile() {
    this.profile$ = this.store.pipe(
      select(selectProfile),
      tap(profile => {
        if (!profile) return this.profileService.getProfile().subscribe();
      })
    );
  }

  // form
  initializeForm() {
    this.profileForm = this.formBuilder.group({
      username: new FormControl("", [Validators.required]),
      // hometown: new FormControl(""),
      // gender: new FormControl(""),
      occupation: new FormControl("")
      // about: new FormControl("")
    });
  }

  // cbs
  blurEvent() {}

  changeFormType(formType) {
    this.formType = formType;
  }

  handleSubmit() {}

  navToProfile() {
    this.router.navigateByUrl("/profile");
  }
}
