import { Component, ViewChild, OnInit, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { tap, filter } from "rxjs/operators";
// Ngrx
import { Store, select } from "@ngrx/store";
import { AppState } from "../../../reducers";
import { selectModalState } from "../modal.selector";
import { CloseModal } from "../modal.actions";

@Component({
  selector: "app-modal-manager",
  templateUrl: "./modal-manager.component.html",
  styleUrls: ["./modal-manager.component.css"]
})
export class ModalManagerComponent implements OnInit, AfterViewInit {
  matched: [any];
  @ViewChild("matchUser")
  matchUser;
  @ViewChild("uploadImage")
  uploadImage;

  constructor(
    private modalService: NgbModal,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit() {
    this.store
      .pipe(
        select(selectModalState),
        filter(modalState => modalState.modalType !== null),
        tap(modalState => {
          // console.log(modalState);
          switch (modalState.modalType) {
            case "matchUser":
              this.matched = modalState.data.match;
              this.open(this.matchUser);
              break;

            case "uploadPhotos":
              this.open(this.uploadImage);
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

  // Use for all modals
  closeModal(modalType = null) {
    this.modalService.dismissAll();
    this.store.dispatch(new CloseModal());
  }

  // matchUser Modal
  closeModalAndRoute(match, e) {
    e.preventDefault();
    this.closeModal();
    const url = `map/matches/storyList/${match._id}`;
    this.router.navigateByUrl(url);
  }

  // uploadImage Modal
  closeModalAndNav(e) {
    e.preventDefault();
    this.closeModal();
    const userId = "";
    const storyId = "";

    const url = `story/details/${userId}/${storyId}`;
    this.router.navigateByUrl(url);
  }
  closeModalAndUploadPhoto(e) {
    e.preventDefault();
    this.closeModal();

    const userId = "";
    const storyId = "";
    const url = `photos/${userId}/${storyId}`;

    this.router.navigateByUrl(url);
  }
}
