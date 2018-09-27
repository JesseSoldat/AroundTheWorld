import { Component, OnInit, Input } from "@angular/core";

const links = {
  dashboard: "/dashboard",
  register: "/register",
  login: "/login"
};

@Component({
  selector: "app-link",
  templateUrl: "./link.component.html",
  styleUrls: ["./link.component.css"]
})
export class LinkComponent implements OnInit {
  @Input()
  text: string;
  link: string;

  constructor() {}

  ngOnInit() {
    this.link = links[this.text.toLowerCase()];
    console.log(this.link);
  }
}
