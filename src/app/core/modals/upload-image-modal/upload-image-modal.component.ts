import { Component, Input, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
// Rxjs
import { first } from "rxjs/operators";
import { Observable } from "rxjs";
// Ngrx
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
  data;

  constructor(
    private modalService: NgbModal,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit() {
    this.modalType$.subscribe(type => {
      console.log("Modal Type:", type);

      if (type === "uploadPhotos") {
        this.modalData$.pipe(first()).subscribe(data => {
          console.log("uploadPhotos Data", data);
          this.data = data;

          this.open(this.uploadPhotos);
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
        // e === 0 is a background click
        if (e === 0) {
          this.navToStoryDetails();
        }
      }
    );
  }

  // All Events button | background clicks
  closeModal() {
    this.modalService.dismissAll();
  }

  navToStoryDetails() {
    const userId = this.data.story.user;
    const storyId = this.data.story._id;
    const url = `/map/storyDetails/${userId}/${storyId}`;
    this.router.navigateByUrl(url);
  }

  closeModalAndNav() {
    this.closeModal();
    this.navToStoryDetails();
  }

  closeModalAndUploadPhoto() {
    this.closeModal();
    const userId = this.data.story.user;
    const storyId = this.data.story._id;
    const url = `/uploadImage/${userId}/${storyId}`;

    this.router.navigateByUrl(url);
  }
}
