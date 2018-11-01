import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
// Rxjs
import { Observable } from "rxjs";
import { tap, switchMap, filter } from "rxjs/operators";
// Ngrx
import { AuthState } from "../../auth/auth.reducer";
import { Store, select } from "@ngrx/store";
import { selectIsAuth } from "../../auth/auth.selectors";
import { selectUserId } from "../../auth/auth.selectors";
import { selectReceivedFriendRequest } from "../../friend/friend.selector";
import { OpenModal } from "../modals/modal.actions";
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
  isAuth: boolean;
  userId$: Observable<string>;
  requestLength: number;
  friendRequests;

  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store<AuthState>,
    private friendService: FriendService
  ) {}

  ngOnInit() {
    this.checkForAuthenticatedUser();
    this.getUserId();
    this.getFriendRequests();
  }

  // store & api calls
  checkForAuthenticatedUser() {
    this.isAuth$ = this.store.pipe(
      select(selectIsAuth),
      tap(isAuth => (this.isAuth = isAuth))
    );
  }

  getUserId() {
    this.userId$ = this.store.pipe(
      select(selectUserId),
      tap(userId => {
        if (!userId) return;
      })
    );
  }

  getFriendRequests() {
    this.userId$
      .pipe(
        filter(userId => userId !== null),
        switchMap(userId => {
          return this.store.select(selectReceivedFriendRequest(userId));
        }),
        tap(receivedFriendRequest => {
          if (receivedFriendRequest)
            if (receivedFriendRequest) {
              // console.log("receivedFriendRequest", receivedFriendRequest);
              // fetch friendRequest from store
              this.friendRequests = receivedFriendRequest;
              return (this.requestLength = receivedFriendRequest.length);
            }
          // fetch friendRequest from api
          this.friendService.allFriendRequests().subscribe();
        })
      )
      .subscribe();
  }

  // cbs & events
  friendRequest() {
    this.store.dispatch(
      new OpenModal({ modalType: "friendsRequest", data: this.friendRequests })
    );
  }

  navigateTo() {
    const url = this.isAuth ? "/dashboard" : "/";
    this.router.navigateByUrl(url);
  }

  logout() {
    this.authService.logout().subscribe(res => {}, err => {});
  }
}
