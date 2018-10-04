import { Component, ViewChild, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { tap, filter, switchMap } from "rxjs/operators";
import { Observable } from "rxjs";
// Ngrx
import { Store, select } from "@ngrx/store";
import { AppState } from "../../../reducers";
import { selectModalType, selectModalData } from "../modal.selector";
import { CloseModal } from "../modal.actions";

@Component({
  selector: "app-modal-manager",
  templateUrl: "./modal-manager.component.html",
  styleUrls: ["./modal-manager.component.css"]
})
export class ModalManagerComponent implements OnInit {
  @ViewChild("matchUser")
  matchUser;
  @ViewChild("uploadImage")
  uploadImage;

  modalData$: Observable<any>;
  modalType$: Observable<string>;

  constructor(
    private modalService: NgbModal,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit() {
    this.modalType$ = this.store.pipe(select(selectModalType));

    this.modalData$ = this.store.pipe(select(selectModalData));
  }

  // uploadImage Modal
  // closeModalAndNav() {
  //   this.closeModal();
  //   const userId = this.data.story.user;
  //   const storyId = this.data.story._id;
  //   const url = `/map/storyDetails/${userId}/${storyId}`;
  //   this.router.navigateByUrl(url);
  // }
  // closeModalAndUploadPhoto() {
  //   this.closeModal();
  //   const userId = this.data.story.user;
  //   const storyId = this.data.story._id;
  //   const url = `/uploadImage/${userId}/${storyId}`;

  //   this.router.navigateByUrl(url);
  // }
}
