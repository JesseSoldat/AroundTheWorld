import { Component, OnInit } from "@angular/core";
// Rxjs
import { of, Observable } from "rxjs";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
// Models
import { Auth } from "../../models/auth.model";
import { InputGroup } from "../../models/input-group.model";
import { HttpRes } from "../../models/http-res.model";
// Data
import { formGroupData } from "../formGroupData";
// Helpers
import { fieldValidation } from "../helpers/fieldValidation";
// Services
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  formGroupData$: Observable<InputGroup> = null;
  // Form
  loginForm: FormGroup;
  // Form Errors
  controlNameErrs = {
    email: null,
    password: null
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl("jlab@jlab.com", [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl("123456", [Validators.required])
    });
  }

  ngOnInit() {
    this.formGroupData$ = of(formGroupData);
  }

  // Helpers -----------------------------------
  createErrMsg(controlName: string, currentControlErr) {
    this.controlNameErrs[controlName] = fieldValidation(currentControlErr);
  }

  // Events & Cbs ---------------------------
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
