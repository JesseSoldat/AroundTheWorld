import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { shareReplay } from "rxjs/operators";
// Ngrx
import { Store, select } from "@ngrx/store";
import { AppState } from "../../../reducers";
import { selectModalType, selectModalData } from "../modal.selector";

@Component({
  selector: "app-modal-manager",
  templateUrl: "./modal-manager.component.html",
  styleUrls: ["./modal-manager.component.css"]
})
export class ModalManagerComponent implements OnInit {
  modalData$: Observable<any>;
  modalType$: Observable<string>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.modalType$ = this.store.pipe(
      select(selectModalType),
      shareReplay()
    );

    this.modalData$ = this.store.pipe(select(selectModalData));
  }
}
