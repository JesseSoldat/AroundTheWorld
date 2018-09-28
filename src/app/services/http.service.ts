import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
// Rxjs
import { tap, map } from "rxjs/operators";
import { Observable } from "rxjs";
// Models
import { HttpRes } from "../models/http-res.model";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  constructor(private http: HttpClient) {}

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
}
