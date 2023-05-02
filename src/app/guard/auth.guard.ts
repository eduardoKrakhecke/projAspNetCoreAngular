import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { Key } from "../constants/key-token";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(): boolean {
    if(localStorage.getItem(Key.USERKEY) !== null)
    return true;

    alert("Usuário não autenticado, faça o login para acessar essa página")
    this.router.navigate(['/user/login'])
    return  false
  }

}
