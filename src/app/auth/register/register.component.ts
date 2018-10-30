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
// validators
import { confirmPasswordValidator } from "../helpers/confirmPassword.validator";
// services
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  formGroupData$: Observable<InputGroup> = null;
  // form
  registerForm: FormGroup;
  // form errors
  controlNameErrs = {
    username: null,
    email: null,
    password: null,
    confirmPassword: null
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
    this.registerForm = this.formBuilder.group({
      username: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ]),
      email: new FormControl("", [Validators.required, Validators.email]),
      passwordGroup: this.formBuilder.group(
        {
          password: [
            "",
            [
              Validators.required,
              Validators.minLength(6),
              Validators.maxLength(15)
            ]
          ],
          confirmPassword: ["", [Validators.required]]
        },
        {
          validator: confirmPasswordValidator
        }
      )
    });
  }

  // helpers -----------------------------------
  createErrMsg(controlName: string, currentControlErr) {
    this.controlNameErrs[controlName] = fieldValidation(currentControlErr);
  }

  handlePasswordGroupErrs(controlName: string) {
    const passwordGroup = this.registerForm.get("passwordGroup");

    // handle the group validator error
    if (controlName === "confirmPassword") {
      const currentControlGroupErr = passwordGroup.errors;
      return this.createErrMsg(controlName, currentControlGroupErr);
    }

    // handle a single control error
    const currentControlErr = passwordGroup.get(controlName).errors;
    this.createErrMsg(controlName, currentControlErr);
  }

  // events & cbs ---------------------------
  blurEvent(controlName: string) {
    // handle group controls
    if (controlName === "password" || controlName === "confirmPassword") {
      return this.handlePasswordGroupErrs(controlName);
    }
    // handle any other controls
    const currentControlErr = this.registerForm.get(controlName).errors;
    this.createErrMsg(controlName, currentControlErr);
  }

  handleSubmit() {
    const formValues = this.registerForm.value;

    const auth: Auth = {
      username: formValues.username,
      email: formValues.email,
      password: formValues.passwordGroup.password
    };

    this.authService
      .registerByEmail(auth)
      .subscribe((res: HttpRes) => {}, err => {});
  }
}
