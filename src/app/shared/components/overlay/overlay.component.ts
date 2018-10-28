import { Component, Input } from "@angular/core";
import { Observable } from "rxjs";

@Component({
  selector: "app-overlay",
  templateUrl: "./overlay.component.html",
  styleUrls: ["./overlay.component.css"]
})
export class OverlayComponent {
  @Input()
  overlay$: Observable<boolean>;
}
