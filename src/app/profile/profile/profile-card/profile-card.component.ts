import { Component, Input, OnInit } from "@angular/core";
// model
import { Profile } from "src/app/models/profile.model";

@Component({
  selector: "app-profile-card",
  templateUrl: "./profile-card.component.html",
  styleUrls: ["./profile-card.component.css"]
})
export class ProfileCardComponent implements OnInit {
  @Input()
  profile: Profile;
  avatar: string;

  constructor() {}

  ngOnInit() {
    this.avatar = this.profile.avatar
      ? this.profile.avatar
      : "../../../../assets/img/userdefault.png";
  }
}
