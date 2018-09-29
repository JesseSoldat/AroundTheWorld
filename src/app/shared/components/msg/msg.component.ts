import { Component, OnInit } from "@angular/core";
// Rxjs
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
// Ngrx
import { AppState } from "../../../reducers";
import { Store, select } from "@ngrx/store";
import { selectMsg } from "../../shared.selectors";
import { ShowMsg } from "../../shared.actions";
// Models
import { UiMsg } from "../../../models/ui-msg.model";

@Component({
  selector: "app-msg",
  templateUrl: "./msg.component.html",
  styleUrls: ["./msg.component.css"]
})
export class MsgComponent implements OnInit {
  msg$: Observable<UiMsg>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.msg$ = this.store.pipe(
      select(selectMsg),
      tap(msg => this.handleCloseMsg(msg))
    );
  }

  handleCloseMsg(msg: UiMsg) {
    if (msg && msg.color !== "alert-danger") {
      setTimeout(() => this.closeAlert(), 3000);
    }
  }

  closeAlert() {
    this.store.dispatch(new ShowMsg({ msg: null }));
  }
}
