import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
// rxjs
import { tap, catchError } from "rxjs/operators";
import { Observable, of } from "rxjs";
// ngrx
import { Store } from "@ngrx/store";
import { AppState } from "../reducers";
import { Register, Login, Logout } from "../auth/auth.actions";
// models
import { Auth } from "../models/auth.model";
import { User } from "../models/user.model";
import { HttpRes } from "../models/http-res.model";
// utils
import { decodeToken } from "../utils/auth/decodeToken";
// services
import { HttpService } from "./http.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private httpService: HttpService,
    private store: Store<AppState>,
    private toastr: ToastrService
  ) {}

  // helpers
  handleError(err) {
    console.log("auth service err", err);
    this.toastr.error("", err.msg, {
      timeOut: 3000,
      positionClass: "toast-bottom-right"
    });

    return of({ msg: err.msg, payload: null });
  }

  handleSuccess(msg) {
    this.toastr.success("", msg, {
      timeOut: 3000,
      positionClass: "toast-bottom-right"
    });
  }

  fromTokenToUser(token: string): User {
    const decodedToken = decodeToken(token);

    return {
      _id: decodedToken._id,
      username: decodedToken.username,
      role: decodedToken.role
    };
  }

  // api calls
  registerByEmail(auth: Auth): Observable<HttpRes> {
    return this.httpService.httpPostRequest("register", auth).pipe(
      tap((res: HttpRes) => {
        const { msg, payload } = res;
        const { token } = payload;
        const user: User = this.fromTokenToUser(token);

        // token must be send before login action is dispatched
        // when user logs in a call to request friends is sent
        // the auth interceptor will nee the token
        localStorage.setItem("token", token);

        this.handleSuccess(msg);
        this.store.dispatch(new Register({ user, token }));
      }),
      catchError(err => this.handleError(err.error))
    );
  }

  loginByEmail(auth: Auth): Observable<HttpRes> {
    return this.httpService.httpPostRequest("login", auth).pipe(
      tap((res: HttpRes) => {
        const { msg, payload } = res;
        const { token } = payload;
        const user: User = this.fromTokenToUser(token);

        // token must be send before login action is dispatched
        // when user logs in a call to request friends is sent
        // the auth interceptor will nee the token
        localStorage.setItem("token", token);

        this.handleSuccess(msg);
        this.store.dispatch(new Login({ user, token }));
      }),
      catchError(err => this.handleError(err.error))
    );
  }

  logout() {
    return this.httpService.httpDeleteRequest("logout").pipe(
      tap((res: HttpRes) => this.store.dispatch(new Logout({ user: null }))),
      catchError(err => this.handleError(err.error))
    );
  }
}
