import { Component, Output, Input, EventEmitter } from "@angular/core";
// models
import { Story } from "../../../models/story.model";

@Component({
  selector: "app-friends-photos",
  templateUrl: "./friends-photos.component.html",
  styleUrls: ["./friends-photos.component.css"]
})
export class FriendsPhotosComponent {
  @Output()
  sendFriendRequest = new EventEmitter<void>();
  @Output()
  acceptFriendRequest = new EventEmitter<void>();
  @Output()
  viewImage = new EventEmitter<string>();
  @Input()
  story: Story;
  // status = notRequested | sentRequest | receivedRequest | isFriend
  @Input()
  status: string;

  // events & cbs
  onSendFriendRequest(): void {
    this.sendFriendRequest.emit();
  }

  // received request to be friends
  onAcceptFriendRequest(): void {
    this.acceptFriendRequest.emit();
  }

  // modal detail view
  onViewImage(url: string) {
    this.viewImage.emit(url);
  }
}
