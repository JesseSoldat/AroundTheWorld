import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";

@Component({
  selector: "app-img-card",
  templateUrl: "./img-card.component.html",
  styleUrls: ["./img-card.component.css"]
})
export class ImgCardComponent implements OnInit {
  @Input()
  data;

  constructor() {}

  ngOnInit() {}
}
