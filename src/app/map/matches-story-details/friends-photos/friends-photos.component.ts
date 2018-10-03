import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-friends-photos",
  templateUrl: "./friends-photos.component.html",
  styleUrls: ["./friends-photos.component.css"]
})
export class FriendsPhotosComponent implements OnInit {
  @Input()
  story;

  constructor() {}

  ngOnInit() {}
}
