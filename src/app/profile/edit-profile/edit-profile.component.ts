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
import { ProfileRequested } from "../profile.actions";
// models
import { Profile } from "../../models/profile.model";
import { InputGroup } from "../../models/input-group.model";
import { RadioGroup } from "../..//models/radio-group.model";
// data
import { profileFormGroupData } from "./profileFormGroupData";
import { profileRadioGroupData } from "./profileRadioGroupData";

@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.css"]
})
export class EditProfileComponent implements OnInit {
  profile$: Observable<Profile>;
  formGroupData$: Observable<InputGroup> = null;
  formGroupData = profileFormGroupData;
  radioGroupData$: Observable<RadioGroup> = null;
  profileForm: FormGroup;
  formType: string = "basic";
  // form errors
  controlNameErrs = {
    username: null
  };

  name;

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private formBuilder: FormBuilder
  ) {
    this.initializeForm();
    this.name = new FormControl("Jesse");
  }

  ngOnInit() {
    this.formGroupData$ = of(profileFormGroupData);
    this.radioGroupData$ = of(profileRadioGroupData);
    this.requestProfile();
  }

  // store / api calls
  requestProfile() {
    this.profile$ = this.store.pipe(
      select(selectProfile),
      tap(profile => {
        if (!profile) this.store.dispatch(new ProfileRequested());
      })
    );
  }

  // form
  initializeForm() {
    this.profileForm = this.formBuilder.group({
      username: new FormControl("Jesse", [Validators.required]),
      hometown: new FormControl(""),
      occupation: new FormControl(""),
      about: new FormControl(""),
      gender: new FormControl("male")
    });

    this.profileForm.patchValue({ gender: "male", occupation: "coder" });
  }

  // cbs
  blurEvent() {}

  changeFormType(formType) {
    this.formType = formType;
  }

  handleSubmit() {
    console.log(this.profileForm.value);
  }

  navToProfile() {
    this.router.navigateByUrl("/profile");
  }
}
