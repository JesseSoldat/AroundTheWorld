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
  usernameErr: string;
  emailErr: string;
  passwordErr: string;
  confirmPasswordErr: string;

  constructor(private formBuilder: FormBuilder) {
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
      password: [
        "123456",
        [Validators.required, Validators.minLength(6), Validators.maxLength(15)]
      ],
      confirmPassword: ["123456", [Validators.required]]
    });
  }

  ngOnInit() {
    this.formGroupData$ = of(formGroupData);
  }

  blurEvent(from) {
    console.log("from", from);
  }

  handleSubmit() {
    const formValues = this.registerForm.value;
    console.log(formValues);
  }
}
