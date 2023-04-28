import {Component, OnInit} from '@angular/core';
import {AbstractControlOptions, FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Validator } from '@app/utils/validator'
import {AccountService} from "@app/services/account/account.service";
import {User} from "@app/models/identity/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  user = {} as User
  form: FormGroup

  constructor(
    public fb: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) {
  }

  get f(): any {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.validation();
  }

  validation(): void {

    const formOptions: AbstractControlOptions = {
      validators: Validator.MustMatch('password', 'confirmarPassword')
    };

    this.form = this.fb.group({
      primeiroNome: ['', Validators.required],
      ultimoNome: ['', Validators.required],
      email: ['',
        [Validators.required, Validators.email]
      ],
      userName: ['', Validators.required],
      password: ['',
        [Validators.required, Validators.minLength(4)]
      ],
      confirmarPassword: ['', Validators.required],
    }, formOptions);
  }

  createUser(): void {
    this.user = {... this.form.value}
    this.accountService.register(this.user).subscribe(
      ()=> { this.router.navigateByUrl('/dashboard')},
      (error)=> { console.log(error)},
      ()=> {}
    )
  }

}
