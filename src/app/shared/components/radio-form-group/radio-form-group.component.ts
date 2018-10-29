import { Component, Input } from "@angular/core";

@Component({
  selector: "app-radio-form-group",
  templateUrl: "./radio-form-group.component.html",
  styleUrls: ["./radio-form-group.component.css"]
})
export class RadioFormGroupComponent {
  @Input()
  groupLabel;
}
