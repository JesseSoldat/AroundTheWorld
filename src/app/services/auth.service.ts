import { Injectable } from "@angular/core";
// Rxjs
import { tap, catchError } from "rxjs/operators";
import { Observable, of } from "rxjs";
// Ngrx
import { Store } from "@ngrx/store";
import { AppState } from "../reducers";
import { Register, Login, Logout } from "../auth/auth.actions";
import { ShowMsg } from "../shared/shared.actions";
// Models
import { Auth } from "../models/auth.model";
import { User } from "../models/user.model";
import { HttpRes } from "../models/http-res.model";
// Utils
import { decodeToken } from "../utils/auth/decodeToken";
// Services
import { HttpService } from "./http.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private httpService: HttpService,
    private store: Store<AppState>
  ) {}

  // Helpers
  handleError(err) {
    this.store.dispatch(new ShowMsg({ msg: err.msg }));
    return of({ msg: err.msg, payload: null });
  }

  fromTokenToUser(token: string): User {
    const decodedToken = decodeToken(token);

    return {
      _id: decodedToken._id,
      username: decodedToken.username,
      role: decodedToken.role
    };
  }

  registerByEmail(auth: Auth): Observable<HttpRes> {
    return this.httpService.httpPostRequest("register", auth).pipe(
      tap((res: HttpRes) => {
        const { msg, payload } = res;
        const { token } = payload;
        const user: User = this.fromTokenToUser(token);

        this.store.dispatch(new ShowMsg({ msg }));
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

        this.store.dispatch(new ShowMsg({ msg }));
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
