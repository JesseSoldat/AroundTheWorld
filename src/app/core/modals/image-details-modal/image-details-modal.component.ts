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
  selector: "app-image-details-modal",
  templateUrl: "./image-details-modal.component.html",
  styleUrls: ["./image-details-modal.component.css"]
})
export class ImageDetailsModalComponent implements OnInit {
  @Input()
  modalData$: Observable<any>;
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
          // console.log("imageDetails data", data);
          this.data = data;
          this.open(this.imageDetails);
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
          console.log("Close Modal", event);
          this.store.dispatch(new CloseModal());
        }
      }
    );
  }

  // click close button or x button
  closeModal() {
    this.modalService.dismissAll();
  }
}
