import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-friend-btn-group",
  templateUrl: "./friend-btn-group.component.html",
  styleUrls: ["./friend-btn-group.component.css"]
})
export class FriendBtnGroupComponent {
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
