import { Component, Output, Input, EventEmitter, OnInit } from "@angular/core";
// Services\
import { FriendService } from "../../../services/friend.service";
@Component({
  selector: "app-friends-photos",
  templateUrl: "./friends-photos.component.html",
  styleUrls: ["./friends-photos.component.css"]
})
export class FriendsPhotosComponent implements OnInit {
  @Input()
  story;
  @Input()
  permission;

  constructor(private friendsService: FriendService) {}

  ngOnInit() {}

  // Events & Cbs
  sendFriendRequest(matchedUserId) {
    // requested | accepted | rejected
    this.friendsService
      .sendFriendRequest(matchedUserId)
      .subscribe(res => {}, err => {});
  }

  viewImage(url) {
    console.log("viewImage", url);
  }
}
