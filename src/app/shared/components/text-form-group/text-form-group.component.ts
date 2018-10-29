import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";
// models
import { InputGroup } from "../../../models/input-group.model";

@Component({
  selector: "app-text-form-group",
  templateUrl: "./text-form-group.component.html",
  styleUrls: ["./text-form-group.component.css"]
})
export class TextFormGroupComponent implements OnInit {
  @Input("name")
  key;
  @Input()
  data$: Observable<InputGroup>;
  @Input()
  errMsg: string;

  constructor() {}

  ngOnInit() {}
}
