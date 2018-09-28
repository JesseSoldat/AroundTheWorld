import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
// Rxjs
import { tap, map } from "rxjs/operators";
import { Observable } from "rxjs";
// Ngrx
import { Store } from "@ngrx/store";
import { AppState } from "../reducers";
import { Register } from "../auth/auth.actions";
// Models
import { Auth } from "../models/auth.model";
import { User } from "../models/user.model";
import { HttpRes } from "../models/http-res.model";
// Utils
import { decodeToken } from "../utils/auth/decodeToken";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient, private store: Store<AppState>) {}

  httpPostRequest(path, data): Observable<HttpRes> {
    return this.http
      .post<HttpRes>(`api/${path}`, data, {
        observe: "response"
      })
      .pipe(
        tap((res: HttpResponse<HttpRes>) => {
          console.log("Http Res:", res);
        }),
        map((res: HttpResponse<HttpRes>) => res.body)
      );
  }

  registerByEmail(auth: Auth): Observable<HttpRes> {
    return this.httpPostRequest("register", auth).pipe(
      tap((res: HttpRes) => {
        const { msg, payload } = res;

        const token = decodeToken(payload.token);

        const user: User = {
          _id: token._id,
          username: token.username,
          role: token.role
        };

        this.store.dispatch(new Register({ user }));
      })
    );
  }
}
