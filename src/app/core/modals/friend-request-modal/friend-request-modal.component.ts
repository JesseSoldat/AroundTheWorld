import { Component, Input, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
// rxjs
import { first } from "rxjs/operators";
import { Observable } from "rxjs";
// ngrx
import { Store, select } from "@ngrx/store";
import { AppState } from "../../../reducers";
import { CloseModal } from "../modal.actions";

@Component({
  selector: "app-friend-request-modal",
  templateUrl: "./friend-request-modal.component.html",
  styleUrls: ["./friend-request-modal.component.css"]
})
export class FriendRequestModalComponent implements OnInit {
  @Input()
  modalData$: Observable<any>;
  @Input()
  modalType$: Observable<string>;
  @ViewChild("friendsRequest")
  friendsRequest;
  data;

  constructor(private modalService: NgbModal, private store: Store<AppState>) {}

  ngOnInit() {
    this.modalType$.subscribe(type => {
      if (type === "friendsRequest") {
        this.modalData$.pipe(first()).subscribe(data => {
          console.log("friendsRequest Data", data);
          this.data = data;

          this.open(this.friendsRequest);
        });
      }
    });
  }

  open(modalRef) {
    const modal = this.modalService.open(modalRef);
    modal.result.then(
      () => {},
      e => {
        // All Events button | background clicks
        console.log("Close Modal", e);
        this.store.dispatch(new CloseModal());
      }
    );
  }

  // All Events button | background clicks
  closeModal() {
    this.modalService.dismissAll();
  }

  // Accept / Deny / View Friend Request
  viewProfile(requester, $event) {
    $event.preventDefault();
    console.log(requester);
  }

  acceptRequest(requester) {
    console.log(requester);
  }

  denyRequest(requester) {
    console.log(requester);
  }
}
