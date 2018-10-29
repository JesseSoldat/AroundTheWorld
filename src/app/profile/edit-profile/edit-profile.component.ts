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
import { selectError, selectProfile } from "../profile.selector";
import { AppState } from "../../reducers";
import { ProfileRequested } from "../profile.actions";
// models
import { Profile } from "../../models/profile.model";
import { InputGroup } from "../../models/input-group.model";
// data
import { profileFormGroupData } from "./profileFormGroupData";

@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.css"]
})
export class EditProfileComponent implements OnInit {
  error$: Observable<string>;
  profile$: Observable<Profile>;
  formGroupData: InputGroup;
  profileForm: FormGroup;
  formType: string = "basic";
  // form errors
  controlNameErrs = {
    username: null
  };

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private formBuilder: FormBuilder
  ) {
    this.initializeForm();
  }

  ngOnInit() {
    this.listenForErrors();
    this.requestProfile();
    this.formGroupData = profileFormGroupData;
  }

  // store / api calls
  listenForErrors() {
    this.error$ = this.store.pipe(
      select(selectError),
      tap(error => console.log(error))
    );
  }

  fetchData() {
    console.log("fetch data again");
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

  // form
  initializeForm() {
    this.profileForm = this.formBuilder.group({
      username: new FormControl("", [Validators.required]),
      hometown: new FormControl(""),
      occupation: new FormControl(""),
      about: new FormControl(""),
      gender: new FormControl("")
    });

    this.profileForm.patchValue({ gender: "male" });
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
