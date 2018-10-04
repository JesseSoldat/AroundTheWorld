import { Component, OnInit } from "@angular/core";
// Rxjs
import { Observable } from "rxjs";
import { tap, switchMap } from "rxjs/operators";
// Ngrx
import { AuthState } from "../../auth/auth.reducer";
import { Store, select } from "@ngrx/store";
import { selectIsAuth } from "../../auth/auth.selectors";
import { selectUserId } from "../../auth/auth.selectors";
import { selectReceivedFriendRequest } from "../../friend/friend.selector";
// Services
import { AuthService } from "../../services/auth.service";
import { FriendService } from "../../services/friend.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  isAuth$: Observable<boolean>;
  userId$: Observable<string>;
  requestLength: number;

  constructor(
    private authService: AuthService,
    private store: Store<AuthState>,
    private friendService: FriendService
  ) {}

  ngOnInit() {
    this.isAuth$ = this.store.pipe(select(selectIsAuth));

    this.userId$ = this.store.pipe(
      select(selectUserId),
      tap(userId => {
        if (!userId) return;
      })
    );

    this.userId$
      .pipe(
        switchMap(userId => {
          return this.store.select(selectReceivedFriendRequest(userId));
        }),
        tap(friendRequest => {
          // if (friendRequest) console.log(friendRequest);
          if (friendRequest) return (this.requestLength = friendRequest.length);

          this.friendService.allFriendRequests().subscribe();
        })
      )
      .subscribe();
  }

  friendRequest() {
    console.log("friends");
  }

  viewFriends() {
    console.log("nav friends");
  }

  logout() {
    this.authService.logout().subscribe(res => {}, err => {});
  }
}
