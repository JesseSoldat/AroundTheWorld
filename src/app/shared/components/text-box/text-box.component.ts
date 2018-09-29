import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";

// Models
import { InputGroup } from "../../../models/input-group.model";

@Component({
  selector: "app-text-box",
  templateUrl: "./text-box.component.html",
  styleUrls: ["./text-box.component.css"]
})
export class TextBoxComponent implements OnInit {
  @Input("formControlName")
  key;
  @Input()
  data$: Observable<InputGroup>;
  @Input()
  errMsg: string;

  constructor() {}

  ngOnInit() {}
}
