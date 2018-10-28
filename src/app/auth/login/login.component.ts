import { Component, OnInit } from "@angular/core";
// rxjs
import { of, Observable } from "rxjs";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
// models
import { Auth } from "../../models/auth.model";
import { InputGroup } from "../../models/input-group.model";
import { HttpRes } from "../../models/http-res.model";
// data
import { formGroupData } from "../formGroupData";
// helpers
import { fieldValidation } from "../../utils/validation/fieldValidation";
// services
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  formGroupData$: Observable<InputGroup> = null;
  // form
  loginForm: FormGroup;
  // form errors
  controlNameErrs = {
    email: null,
    password: null
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.formGroupData$ = of(formGroupData);
  }

  // form setup
  initializeForm() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required])
    });
  }

  // helpers -----------------------------------
  createErrMsg(controlName: string, currentControlErr) {
    this.controlNameErrs[controlName] = fieldValidation(currentControlErr);
  }

  // events & cbs ---------------------------
  blurEvent(controlName: string) {
    const currentControlErr = this.loginForm.get(controlName).errors;
    this.createErrMsg(controlName, currentControlErr);
  }

  handleSubmit() {
    const formValues = this.loginForm.value;

    const auth: Auth = {
      email: formValues.email,
      password: formValues.password
    };

    this.authService.loginByEmail(auth).subscribe(
      (res: HttpRes) => {
        // console.log("Login Res", res);
      },
      err => {
        console.log("Login Err", err);
      }
    );
  }
}
