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
import { User } from "../../models/user.model";
import { Auth } from "../../models/auth.model";
import { InputGroup } from "../../models/input-group.model";
// Data
import { formGroupData } from "../formGroupData";
// Helpers
import { fieldValidation } from "../helpers/fieldValidation";
// Validators
import { confirmPasswordValidator } from "../helpers/confirmPassword.validator";

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

  constructor(private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group(
      {
        username: new FormControl("jesse", [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15)
        ]),
        email: new FormControl("jlab@jlab.com", [
          Validators.required,
          Validators.email
        ]),
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
    );
  }

  ngOnInit() {
    this.formGroupData$ = of(formGroupData);
  }

  // Helpers -----------------------------------
  createErrMsg(controlName: string) {
    const currentControlErr = this.registerForm.get(controlName).errors;
    console.log(currentControlErr);

    this.controlNameErrs[controlName] = fieldValidation(currentControlErr);
  }

  // Events & Cbs ---------------------------
  blurEvent(controlName: string) {
    this.createErrMsg(controlName);
  }

  handleSubmit() {
    const formValues = this.registerForm.value;
    console.log(formValues);
  }
}
