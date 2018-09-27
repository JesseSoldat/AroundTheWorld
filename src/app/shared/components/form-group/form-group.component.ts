import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";

// Models
import { InputGroup } from "../../../models/input-group.model";

@Component({
  selector: "app-form-group",
  templateUrl: "./form-group.component.html",
  styleUrls: ["./form-group.component.css"]
})
export class FormGroupComponent implements OnInit {
  @Input()
  data$: Observable<InputGroup>;
  @Input()
  key: string;
  @Input()
  errMsg: string;

  constructor() {}

  ngOnInit() {}
}
