import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable, ReplaySubject } from "rxjs";
import { endpoints } from "../../constants/endpoints";
import {User} from "@app/models/identity/user";
import {map,take} from "rxjs/operators";
import { Key } from "../../constants/key-token";
import {UserUpdate} from "@app/models/identity/user-update";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private  currentUserSource = new ReplaySubject<User>(1)
  public currentUser$ = this.currentUserSource.asObservable()


  public setCurrentUser(user: User): void {
    localStorage.setItem(Key.USERKEY, JSON.stringify(user.token))
    this.currentUserSource.next(user)
  }

  constructor(private http: HttpClient) { }

  login(model: any): Observable<void> {
    return this. http.post<User>(endpoints.login, model).pipe(
      map((response: User) => {
        const user  = response
        if(user) {
          this.setCurrentUser(user)
        }
      })
    )
  }

  logout(): void {
    localStorage.removeItem(Key.USERKEY)
    this.currentUserSource.next(null!)
    this.currentUserSource.complete()
  }

  getUser(): Observable<UserUpdate> {
    return this.http.get<UserUpdate>(endpoints.user).pipe(take(1))
  }

  updateUser(model: UserUpdate): Observable<void> {
   return this.http.put<UserUpdate>(endpoints.updateUser, model).pipe(
     take(1),
     map(
       (user)=>{
         this.setCurrentUser(user)
       }
     )
   )
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
