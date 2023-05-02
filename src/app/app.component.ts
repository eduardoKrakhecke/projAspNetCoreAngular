import { Component } from '@angular/core';
import {AccountService} from "@app/services/account/account.service";
import {User} from "@app/models/identity/user";
import {Key} from "@app/constants/key-token";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public accountService: AccountService) {
  }

  ngOnInit(): void {
    this.setCurrentUser()
  }

  title = 'Evento';

  setCurrentUser(): void {
    let user: any;
    if(localStorage.getItem(Key.USERKEY)) {
      user = JSON.parse(localStorage.getItem(Key.USERKEY) ?? '{}')
    } else {
      user = null
    }
    if(user) {
      this.accountService.setCurrentUser(user)
    }
  }
}
