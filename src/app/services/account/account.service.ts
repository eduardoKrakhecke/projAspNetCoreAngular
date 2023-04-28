import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable, ReplaySubject } from "rxjs";
import { endpoints } from "../../constants/endpoints";
import {User} from "@app/models/identity/user";
import {map,take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private  currentUserSource = new ReplaySubject<User>(1)
  public currentUser$ = this.currentUserSource.asObservable()


  public setCurrentUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user.token))
    this.currentUserSource.next(user)
  }

  constructor(private http: HttpClient) { }

  login(model: any): Observable<void> {
    return this. http.post<User>(endpoints.login, model).pipe(
      take(1),
      map((response: User) => {
        const user  = response
        if(user) {
          this.setCurrentUser(user)
        }
      })
    )
  }

  logout(): void {
    localStorage.removeItem('user')
    this.currentUserSource.next(null!)
    this.currentUserSource.complete()
  }

  register(user: User): Observable<void> {
    return this. http.post<User>(endpoints.register, user).pipe(
      take(1),
      map((response: User) => {
        const user  = response
        if(user) {
          this.setCurrentUser(user)
        }
      })
    )
  }

}
