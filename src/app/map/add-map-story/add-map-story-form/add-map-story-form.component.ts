import { Component, OnInit, Output, EventEmitter } from "@angular/core";
// Rxjs
import { of, Observable } from "rxjs";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
// Data
import { formGroupData } from "../formGroupData";
// Helpers
import { fieldValidation } from "../../../utils/validation/fieldValidation";
// Models
import { InputGroup } from "../../../models/input-group.model";

@Component({
  selector: "app-add-map-story-form",
  templateUrl: "./add-map-story-form.component.html",
  styleUrls: ["./add-map-story-form.component.css"]
})
export class AddMapStoryFormComponent implements OnInit {
  @Output()
  onHandleSubmit = new EventEmitter();
  @Output()
  onCancel = new EventEmitter();
  formGroupData$: Observable<InputGroup> = null;
  storyForm: FormGroup;
  // Form Errors
  controlNameErrs = {
    title: null,
    description: null
  };

  constructor(private formBuilder: FormBuilder) {
    this.storyForm = this.formBuilder.group({
      title: new FormControl("Nice Place!", [Validators.required]),
      description: new FormControl("This was the first place I traveled to.")
    });
  }

  ngOnInit() {
    this.formGroupData$ = of(formGroupData);
  }

  // Helpers
  validateErrors(controlName: string) {
    const currentControlErr = this.storyForm.get(controlName).errors;
    this.controlNameErrs[controlName] = fieldValidation(currentControlErr);
  }

  // Events & Cbs ---------------------------
  blurEvent(controlName: string) {
    if (controlName === "title") this.validateErrors(controlName);
  }

  cancel() {
    this.onCancel.emit();
  }

  handleSubmit() {
    const formValues = this.storyForm.value;

    this.onHandleSubmit.emit(formValues);
  }
}
