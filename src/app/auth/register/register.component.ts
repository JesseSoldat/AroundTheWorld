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
// Validators
import { confirmPasswordValidator } from "../helpers/confirmPassword.validator";
// Services
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  formGroupData$: Observable<InputGroup> = null;
  // Form
  registerForm: FormGroup;
  // Form Errors
  controlNameErrs = {
    username: null,
    email: null,
    password: null,
    confirmPassword: null
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.registerForm = this.formBuilder.group({
      username: new FormControl("jesse", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ]),
      email: new FormControl("jlab@jlab.com", [
        Validators.required,
        Validators.email
      ]),
      passwordGroup: this.formBuilder.group(
        {
          password: [
            "123456",
            [
              Validators.required,
              Validators.minLength(6),
              Validators.maxLength(15)
            ]
          ],
          confirmPassword: ["123456", [Validators.required]]
        },
        {
          validator: confirmPasswordValidator
        }
      )
    });
  }

  ngOnInit() {
    this.formGroupData$ = of(formGroupData);
  }

  // Helpers -----------------------------------
  createErrMsg(controlName: string, currentControlErr) {
    this.controlNameErrs[controlName] = fieldValidation(currentControlErr);
  }

  handlePasswordGroupErrs(controlName: string) {
    const passwordGroup = this.registerForm.get("passwordGroup");

    // Handle the Group Validator Error
    if (controlName === "confirmPassword") {
      const currentControlGroupErr = passwordGroup.errors;
      return this.createErrMsg(controlName, currentControlGroupErr);
    }

    // Handle a Single Control Error
    const currentControlErr = passwordGroup.get(controlName).errors;
    this.createErrMsg(controlName, currentControlErr);
  }

  // Events & Cbs ---------------------------
  blurEvent(controlName: string) {
    // Handle Group Controls
    if (controlName === "password" || controlName === "confirmPassword") {
      return this.handlePasswordGroupErrs(controlName);
    }
    // Handle any other Controls
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

    this.authService.registerByEmail(auth).subscribe(
      (res: HttpRes) => {
        // console.log("Res", res);
      },
      err => {
        console.log("Register Err:", err);
      }
    );
  }
}
