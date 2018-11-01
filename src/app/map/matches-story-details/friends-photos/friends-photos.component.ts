import { Component, Output, Input, EventEmitter, OnInit } from "@angular/core";
// services
import { FriendService } from "../../../services/friend.service";
import { Profile } from "../../../models/profile.model";
import { Story } from "../../../models/story.model";

@Component({
  selector: "app-friends-photos",
  templateUrl: "./friends-photos.component.html",
  styleUrls: ["./friends-photos.component.css"]
})
export class FriendsPhotosComponent implements OnInit {
  @Input()
  story: Story;
  // status = notRequested | sentRequest | receivedRequest | isFriend
  @Input()
  status;

  constructor(private friendsService: FriendService) {}

  ngOnInit() {}

  // events & cbs
  sendFriendRequest(matchedUserId): void {
    // requested | accepted
    this.friendsService
      .sendFriendRequest(matchedUserId)
      .subscribe(res => {}, err => {});
  }

  // received request to be friends
  addUserToFriends() {}

  // modal detail view
  viewImage(url) {
    console.log("viewImage", url);
  }
}
