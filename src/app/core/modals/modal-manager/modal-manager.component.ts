import { Component, ViewChild, OnInit, AfterViewInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { tap, filter } from "rxjs/operators";
// Ngrx
import { Store, select } from "@ngrx/store";
import { AppState } from "../../../reducers";
import { selectModalState } from "../modal.selector";

@Component({
  selector: "app-modal-manager",
  templateUrl: "./modal-manager.component.html",
  styleUrls: ["./modal-manager.component.css"]
})
export class ModalManagerComponent implements OnInit, AfterViewInit {
  match: [any];
  @ViewChild("matchUser")
  matchUser;
  @ViewChild("login")
  login;

  constructor(private modalService: NgbModal, private store: Store<AppState>) {}

  ngOnInit() {
    this.store
      .pipe(
        select(selectModalState),
        filter(modalState => modalState.modalType !== null),
        tap(modalState => {
          // console.log(modalState);
          switch (modalState.modalType) {
            case "matchUser":
              this.open(this.matchUser);
              break;

            case "login":
              this.open(this.login);
              break;

            default:
              break;
          }
        })
      )
      .subscribe();
  }

  ngAfterViewInit() {}

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
  }
}
