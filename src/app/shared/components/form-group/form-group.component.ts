import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";
// models
import { InputGroup } from "../../../models/input-group.model";

@Component({
  selector: "app-form-group",
  templateUrl: "./form-group.component.html",
  styleUrls: ["./form-group.component.css"]
})
export class FormGroupComponent implements OnInit {
  @Input("formControlName")
  key;
  @Input()
  data$: Observable<InputGroup>;
  @Input()
  errMsg: string;

  ngOnInit() {
    // console.log(this.key);
  }
}
