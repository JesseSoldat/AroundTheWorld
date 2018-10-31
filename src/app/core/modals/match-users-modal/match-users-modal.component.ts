import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
// rxjs
import { first } from "rxjs/operators";
import { Observable } from "rxjs";
// ngrx
import { Store } from "@ngrx/store";
import { AppState } from "../../../reducers";
import { CloseModal } from "../modal.actions";

@Component({
  selector: "app-match-users-modal",
  templateUrl: "./match-users-modal.component.html",
  styleUrls: ["./match-users-modal.component.css"]
})
export class MatchUsersModalComponent implements OnInit {
  @Input()
  modalData$;
  @Input()
  modalType$: Observable<string>;
  @ViewChild("matchUser")
  matchUser;
  data;

  constructor(
    private modalService: NgbModal,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit() {
    this.modalType$.subscribe(type => {
      if (type === "matchUser") {
        this.modalData$.pipe(first()).subscribe(data => {
          this.data = data;
          this.open(this.matchUser);
        });
      }
    });
  }

  open(modalRef) {
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

  closeModal() {
    this.store.dispatch(new CloseModal());
    this.modalService.dismissAll();
  }

  closeModalAndRoute(match, e) {
    e.preventDefault();
    this.closeModal();
    const url = `/map/matches/storyList/${match._id}`;
    this.router.navigateByUrl(url);
  }
}
