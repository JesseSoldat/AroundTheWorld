import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
// validators
import { confirmPasswordValidator } from "../../../auth/helpers/confirmPassword.validator";
// helpers
import { fieldValidation } from "../../../utils/validation/fieldValidation";
// services
import { ProfileService } from "../../../services/profile.service";
// models
import { HttpRes } from "../../../models/http-res.model";
// data
import passwordData from "./passwordData";

@Component({
  selector: "app-update-password",
  templateUrl: "./update-password.component.html",
  styleUrls: ["./update-password.component.css"]
})
export class UpdatePasswordComponent implements OnInit {
  // form
  passwordData = passwordData;
  passwordForm: FormGroup;
  controlNameErrs = {
    password: null,
    confirmPassword: null
  };

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.passwordForm = this.formBuilder.group({
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
    const passwordGroup = this.passwordForm.get("passwordGroup");

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
    this.handlePasswordGroupErrs(controlName);
  }

  handleSubmit() {
    const formValues = this.passwordForm.value;
    const password = formValues.passwordGroup.password;

    this.profileService.updatePassword(password).subscribe(
      (res: HttpRes) => {
        this.passwordForm.reset();
      },
      err => {}
    );
  }
}
