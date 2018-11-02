import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
// rxjs
import { Observable } from "rxjs";
import { tap, switchMap, filter } from "rxjs/operators";
// ngrx
import { AuthState } from "../../auth/auth.reducer";
import { Store, select } from "@ngrx/store";
import { selectIsAuth, selectUserId } from "../../auth/auth.selectors";
import { selectReceivedFriendRequest } from "../../friend/friend.selector";
import { OpenModal } from "../modals/modal.actions";
import { FriendRequestRequested } from "../../friend/friend.actions";
// services
import { AuthService } from "../../services/auth.service";
// modals
import { FriendRequest } from "src/app/models/friend-request.model";

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
  friendRequests: FriendRequest[];

  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store<AuthState>
  ) {}

  ngOnInit(): void {
    this.checkForAuthenticatedUser();
    this.getUserId();
    this.getFriendRequests();
  }

  // store & api calls
  checkForAuthenticatedUser(): void {
    this.isAuth$ = this.store.pipe(
      select(selectIsAuth),
      tap((isAuth: boolean) => (this.isAuth = isAuth))
    );
  }

  getUserId(): void {
    this.userId$ = this.store.pipe(
      select(selectUserId),
      tap((userId: string) => {
        if (!userId) return;
      })
    );
  }

  getFriendRequests(): void {
    this.userId$
      .pipe(
        filter(userId => userId !== null),
        switchMap((userId: string) => {
          return this.store.select(selectReceivedFriendRequest(userId));
        }),
        tap((receivedFriendRequest: FriendRequest[]) => {
          if (receivedFriendRequest) {
            // fetch friendRequest from store
            this.friendRequests = receivedFriendRequest;
            return (this.requestLength = receivedFriendRequest.length);
          }
          // fetch friendRequest from api
          this.store.dispatch(new FriendRequestRequested());
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
