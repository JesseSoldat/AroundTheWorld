import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";
// models
import { RadioGroup } from "../../../models/radio-group.model";

@Component({
  selector: "app-radio-form-group",
  templateUrl: "./radio-form-group.component.html",
  styleUrls: ["./radio-form-group.component.css"]
})
export class RadioFormGroupComponent implements OnInit {
  @Input("name")
  key;
  @Input()
  data$: Observable<RadioGroup>;
  @Input()
  errMsg: string;

  constructor() {}

  ngOnInit() {}
}
