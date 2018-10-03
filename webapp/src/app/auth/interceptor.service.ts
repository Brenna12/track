import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from "rxjs";
import 'rxjs/add/operator/do';
import { AuthenticationService } from "../authentication.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public auth: AuthenticationService) { }


  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getToken()}`
      }
    });
    return next.handle(request);
  }

}