import { Component, Output, Input, EventEmitter, OnInit } from "@angular/core";
// models
import { Story } from "../../../models/story.model";

@Component({
  selector: "app-friends-photos",
  templateUrl: "./friends-photos.component.html",
  styleUrls: ["./friends-photos.component.css"]
})
export class FriendsPhotosComponent implements OnInit {
  @Output()
  sendFriendRequest = new EventEmitter();
  @Input()
  story: Story;
  // status = notRequested | sentRequest | receivedRequest | isFriend
  @Input()
  status;

  constructor() {}

  ngOnInit() {}

  // events & cbs
  onSendFriendRequest(): void {
    this.sendFriendRequest.emit();
  }

  // received request to be friends
  addUserToFriends() {}

  // modal detail view
  viewImage(url) {
    console.log("viewImage", url);
  }
}
