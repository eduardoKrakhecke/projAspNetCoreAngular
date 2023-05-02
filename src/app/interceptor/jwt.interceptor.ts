import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import {Observable} from "rxjs";
import {AccountService} from "@app/services/account/account.service";
import {take} from "rxjs/operators";
import {User} from "@app/models/identity/user";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private accountService: AccountService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let currentUser: User
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      currentUser = user
      if(currentUser) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${currentUser.token}`
          }
        })
      }
    })

    return next.handle(request);
  }
}
