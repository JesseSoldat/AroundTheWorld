import { Component, Input, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
// Models
import { Story } from "../../../models/story.model";
// Data
const distances = "5,10,15,20,50,100,300,500,1000,3000,5000,10000,100000";
@Component({
  selector: "app-list-card",
  templateUrl: "./list-card.component.html",
  styleUrls: ["./list-card.component.css"]
})
export class ListCardComponent implements OnInit {
  @Input()
  data: Story;
  matchUsersForm: FormGroup;
  distances: string[];

  constructor(private formBuilder: FormBuilder) {
    this.distances = distances.split(",");

    this.matchUsersForm = this.formBuilder.group({
      distances: new FormControl(null, [Validators.required]),
      distanceType: new FormControl("miles", [Validators.required])
    });

    this.matchUsersForm.controls["distances"].setValue(this.distances[0], {
      onlySelf: true
    });
  }

  ngOnInit() {}

  handleSubmit() {
    const form = this.matchUsersForm.value;
    console.log(form);
  }
}
