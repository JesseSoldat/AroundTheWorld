import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
// Rxjs
import { of, Observable } from "rxjs";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
// Data
import { formGroupData } from "./formGroupData";
// Models
import { InputGroup } from "../../models/input-group.model";

@Component({
  selector: "app-add-map-story",
  templateUrl: "./add-map-story.component.html",
  styleUrls: ["./add-map-story.component.css"]
})
export class AddMapStoryComponent implements OnInit {
  formGroupData$: Observable<InputGroup> = null;
  storyForm: FormGroup;
  // Form Errors
  controlNameErrs = {
    title: null,
    description: null
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.storyForm = this.formBuilder.group({
      title: new FormControl("Nice Place!", [Validators.required]),
      description: new FormControl("This was the first place I traveled to.")
    });
  }

  ngOnInit() {
    this.formGroupData$ = of(formGroupData);

    this.route.params.subscribe(param => {
      console.log("params", param);
    });
  }

  // Events & Cbs ---------------------------
  blurEvent(controlName: string) {}

  handleSubmit() {}
}
