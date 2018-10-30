import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { Observable } from "rxjs";
import { tap, filter } from "rxjs/operators";
import { Store, select } from "@ngrx/store";
import { selectError, selectOverlay, selectProfile } from "../profile.selector";
import { AppState } from "../../reducers";
import { ProfileRequested, ProfileUpdateStarted } from "../profile.actions";
// models
import { Profile } from "../../models/profile.model";
import { InputGroup } from "../../models/input-group.model";
// data
import { profileFormGroupData } from "./profileFormGroupData";
// helpers
import { fieldValidation } from "../../utils/validation/fieldValidation";

@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.css"]
})
export class EditProfileComponent implements OnInit {
  overlay$: Observable<boolean>;
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
    this.showOverlay();
    this.formGroupData = profileFormGroupData;
  }

  // store / api calls
  showOverlay() {
    this.overlay$ = this.store.pipe(select(selectOverlay));
  }

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
      tap((profile: Profile) => {
        if (!profile) this.store.dispatch(new ProfileRequested());
      }),
      filter((profile: Profile) => profile !== null),
      tap(profile => this.hydrateFormFromApi(profile))
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
  }

  hydrateFormFromApi(profile: Profile) {
    this.profileForm.patchValue({
      username: profile.username,
      occupation: profile.occupation,
      hometown: profile.hometown,
      gender: profile.gender,
      about: profile.about
    });
  }

  // helpers
  createErrMsg(controlName: string, currentControlErr) {
    this.controlNameErrs[controlName] = fieldValidation(currentControlErr);
  }

  // events & cbs ---------------------------
  blurEvent(controlName: string) {
    const currentControlErr = this.profileForm.get(controlName).errors;
    this.createErrMsg(controlName, currentControlErr);
  }

  changeFormType(formType) {
    this.formType = formType;
  }

  handleSubmit() {
    const profile: Profile = this.profileForm.value;

    this.store.dispatch(new ProfileUpdateStarted({ profile }));
  }

  navToProfile() {
    this.router.navigateByUrl("/profile");
  }
}
