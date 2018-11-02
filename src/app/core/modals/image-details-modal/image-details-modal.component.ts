import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
// rxjs
import { first } from "rxjs/operators";
import { Observable } from "rxjs";
// ngrx
import { Store } from "@ngrx/store";
import { AppState } from "../../../reducers";
import { CloseModal } from "../modal.actions";
// models
import { Image } from "../../../models/image.model";
// actions
import { DeleteStoryImageStarted } from "../../../map/story.actions";

@Component({
  selector: "app-image-details-modal",
  templateUrl: "./image-details-modal.component.html",
  styleUrls: ["./image-details-modal.component.css"]
})
export class ImageDetailsModalComponent implements OnInit {
  @Input()
  modalData$: Observable<Image>;
  @Input()
  modalType$: Observable<string>;
  @ViewChild("imageDetails")
  imageDetails;
  data;

  constructor(private modalService: NgbModal, private store: Store<AppState>) {}

  ngOnInit() {
    this.modalType$.subscribe(type => {
      if (type === "imageDetails") {
        this.modalData$.pipe(first()).subscribe(data => {
          this.data = data;
          this.open(this.imageDetails);
        });
      }
    });
  }

  deleteImage() {
    this.closeModal();
    this.store.dispatch(new DeleteStoryImageStarted({ image: this.data }));
  }

  open(modalRef: NgbModal) {
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

  // click close button or x button
  closeModal() {
    this.store.dispatch(new CloseModal());
    this.modalService.dismissAll();
  }
}
