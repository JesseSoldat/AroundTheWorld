import { Injectable } from "@angular/core";
// Rxjs
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
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
      })
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
      })
    );
  }

  logout() {
    return this.httpService.httpDeleteRequest("logout").pipe(
      tap((res: HttpRes) => {
        const { msg } = res;

        this.store.dispatch(new ShowMsg({ msg }));
        this.store.dispatch(new Logout({ user: null }));
      })
    );
  }
}
