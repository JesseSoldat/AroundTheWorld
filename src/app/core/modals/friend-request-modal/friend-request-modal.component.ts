import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
// rxjs
import { first, tap, filter, map } from "rxjs/operators";
import { Observable, of } from "rxjs";
// ngrx
import { Store, select } from "@ngrx/store";
import { AppState } from "../../../reducers";
import { CloseModal } from "../modal.actions";
import { FriendRequestDetailsRequested } from "../../../friend/friend.actions";
import {
  selectFriendRequestsDetails,
  selectLoadingSpinner
} from "../../../friend/friend.selector";
// models
import { Profile } from "../../../models/profile.model";

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

  na = "not available";

  loadingSpinner$: Observable<boolean>;
  currentRequester: Profile;

  constructor(
    private modalService: NgbModal,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.showLoadingSpinner();

    this.modalType$.subscribe(type => {
      if (type === "friendsRequest") {
        this.modalData$.pipe(first()).subscribe(data => {
          // console.log("friendsRequest Data", data);
          this.data = data;

          this.open(this.friendsRequest);
        });
      }
    });
  }

  showLoadingSpinner() {
    this.loadingSpinner$ = this.store.select(selectLoadingSpinner);
  }

  open(modalRef: NgbModal): void {
    const modal = this.modalService.open(modalRef);
    modal.result.then(
      () => {},
      event => {
        // event === 0 is a background click
        if (event === 0) {
          this.store.dispatch(new CloseModal());
        }
      }
    );
  }

  // click close btn
  closeModal(): void {
    this.store.dispatch(new CloseModal());
    this.modalService.dismissAll();
  }

  viewProfile(requester): void {
    const friendRequestIds = [];

    this.data.forEach(obj => {
      friendRequestIds.push(obj.requester._id);
    });

    this.store
      .select(selectFriendRequestsDetails)
      .pipe(
        tap((friendRequestDetails: Profile[]) => {
          if (!friendRequestDetails) {
            return this.store.dispatch(
              new FriendRequestDetailsRequested({ friendRequestIds })
            );
          }
        }),
        filter(
          (friendRequestDetails: Profile) => friendRequestDetails !== null
        ),
        map(
          (friendRequestDetails: Profile[]) =>
            (this.currentRequester = friendRequestDetails.find(
              obj => obj._id === requester._id
            ))
        )
      )
      .subscribe();
  }

  hideProfile(): void {}

  acceptRequest(requester) {
    console.log(requester);
  }

  denyRequest(requester) {
    console.log(requester);
  }
}
