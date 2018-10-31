import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
// Models
import { Story } from "../../../models/story.model";
// Data
const distances =
  "5,10,15,20,50,100,300,500,1000,1500,2000,2500,3000,5000,10000,100000";

@Component({
  selector: "app-list-card",
  templateUrl: "./list-card.component.html",
  styleUrls: ["./list-card.component.css"]
})
export class ListCardComponent implements OnInit {
  @Output()
  onHandleSubmit = new EventEmitter();
  @Input()
  data: Story;
  matchUsersForm: FormGroup;
  distances: string[];
  fText = 100;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.distances = distances.split(",");
    this.initializeForm();
  }
  // Form Setup
  initializeForm() {
    this.matchUsersForm = this.formBuilder.group({
      storyId: new FormControl(this.data._id),
      distances: new FormControl(this.distances[0], [Validators.required]),
      distanceType: new FormControl("miles", [Validators.required])
    });
  }
  // Events and Cbs
  handleSubmit() {
    const form = this.matchUsersForm.value;
    this.onHandleSubmit.emit(form);
  }
}
