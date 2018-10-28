import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-friend-list-group",
  templateUrl: "./friend-list-group.component.html",
  styleUrls: ["./friend-list-group.component.css"]
})
export class FriendListGroupComponent {
  @Output()
  friendRequest = new EventEmitter();
  @Output()
  logout = new EventEmitter();

  @Input()
  requestLength: number;

  onFriendRequest() {
    this.friendRequest.emit();
  }

  onLogout() {
    this.logout.emit();
  }
}
