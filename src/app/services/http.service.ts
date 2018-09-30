import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
// Rxjs
import { catchError, tap, map } from "rxjs/operators";
import { Observable } from "rxjs";
// Models
import { HttpRes } from "../models/http-res.model";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  constructor(private http: HttpClient) {}

  httpGetRequest(path): Observable<HttpRes> {
    return this.http
      .get<HttpRes>(`api/${path}`, {
        observe: "response"
      })
      .pipe(
        tap((res: HttpResponse<HttpRes>) => {
          // console.log("httpPostRequest Res:", res);
        }),
        map((res: HttpResponse<HttpRes>) => res.body)
      );
  }

  httpPostRequest(path, data): Observable<HttpRes> {
    return this.http
      .post<HttpRes>(`api/${path}`, data, {
        observe: "response"
      })
      .pipe(
        tap((res: HttpResponse<HttpRes>) => {
          // console.log("httpPostRequest Res:", res);
        }),
        map((res: HttpResponse<HttpRes>) => res.body)
      );
  }

  httpDeleteRequest(path): Observable<HttpRes> {
    return this.http
      .delete<HttpRes>(`api/${path}`, {
        observe: "response"
      })
      .pipe(
        tap((res: HttpResponse<HttpRes>) => {
          // console.log("httpDelete Res:", res);
        }),
        map((res: HttpResponse<HttpRes>) => res.body)
      );
  }
}
