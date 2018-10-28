import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from "@angular/common/http";
// Rxjs
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    try {
      // console.log("AuthInterceptor");

      const authToken = localStorage.getItem("token");
      // console.log("authToken", authToken);

      if (authToken) {
        req = req.clone({
          setHeaders: {
            "Content-Type": "application/json",
            Authorization: authToken
          }
        });
      }
    } catch (err) {
      console.log("AuthInterceptor could not get token from localStorage", err);
    }

    return next.handle(req);
  }
}
