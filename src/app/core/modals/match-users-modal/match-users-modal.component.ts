import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-match-users-modal",
  templateUrl: "./match-users-modal.component.html",
  styleUrls: ["./match-users-modal.component.css"]
})
export class MatchUsersModalComponent implements OnInit {
  // @Input()
  // data;
  // constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
    // console.log(this.data);
  }
}
