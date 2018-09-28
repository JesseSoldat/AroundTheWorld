import { Component, OnInit } from "@angular/core";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
// Ngrx
import { AuthState } from "../../auth/auth.reducer";
import { Store, select } from "@ngrx/store";
import { selectIsAuth } from "../../auth/auth.selectors";

import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  $isAuth: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private store: Store<AuthState>
  ) {}

  ngOnInit() {
    this.$isAuth = this.store.pipe(select(selectIsAuth));
  }

  logout() {
    this.authService.logout().subscribe(res => {}, err => {});
  }
}
