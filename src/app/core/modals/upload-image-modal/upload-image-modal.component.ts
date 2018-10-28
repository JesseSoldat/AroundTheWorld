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
  selector: "app-upload-image-modal",
  templateUrl: "./upload-image-modal.component.html",
  styleUrls: ["./upload-image-modal.component.css"]
})
export class UploadImageModalComponent implements OnInit {
  @Input()
  modalData$: Observable<any>;
  @Input()
  modalType$: Observable<string>;
  @ViewChild("uploadPhotos")
  uploadPhotos;
  story;

  constructor(
    private modalService: NgbModal,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit() {
    this.modalType$.subscribe(type => {
      if (type === "uploadPhotos") {
        this.modalData$.pipe(first()).subscribe(data => {
          // console.log("uploadPhotos Data", data);
          this.story = data;

          this.open(this.uploadPhotos);
        });
      }
    });
  }

  open(modalRef) {
    const modal = this.modalService.open(modalRef);
    modal.result.then(
      () => {},
      event => {
        // e === 0 is a background click
        if (event === 0) {
          console.log("Close Modal", event);
          this.store.dispatch(new CloseModal());

          this.navToStoryDetails();
        }
      }
    );
  }

  // click close button or x button
  closeModal() {
    this.modalService.dismissAll();
  }

  navToStoryDetails() {
    const userId = this.story.user;
    const storyId = this.story._id;
    const url = `/map/storyDetails/${userId}/${storyId}`;
    this.router.navigateByUrl(url);
  }

  closeModalAndNav() {
    this.closeModal();
    this.navToStoryDetails();
  }

  closeModalAndUploadPhoto() {
    this.closeModal();
    const userId = this.story.user;
    const storyId = this.story._id;
    const url = `/uploadImage/${userId}/${storyId}`;

    this.router.navigateByUrl(url);
  }
}
