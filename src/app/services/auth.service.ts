import { Injectable } from "@angular/core";
// Rxjs
import { tap, map } from "rxjs/operators";
import { Observable } from "rxjs";
// Ngrx
import { Store } from "@ngrx/store";
import { AppState } from "../reducers";
import { Register, Login } from "../auth/auth.actions";
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

  registerByEmail(auth: Auth): Observable<HttpRes> {
    return this.httpService.httpPostRequest("register", auth).pipe(
      tap((res: HttpRes) => {
        const { msg, payload } = res;

        const token = decodeToken(payload.token);

        const user: User = {
          _id: token._id,
          username: token.username,
          role: token.role
        };

        this.store.dispatch(new ShowMsg({ msg }));
        this.store.dispatch(new Register({ user }));
      })
    );
  }

  loginByEmail(auth: Auth): Observable<HttpRes> {
    return this.httpService.httpPostRequest("login", auth).pipe(
      tap((res: HttpRes) => {
        const { msg, payload } = res;

        const token = decodeToken(payload.token);

        const user: User = {
          _id: token._id,
          username: token.username,
          role: token.role
        };

        this.store.dispatch(new ShowMsg({ msg }));
        this.store.dispatch(new Login({ user }));
      })
    );
  }
}
