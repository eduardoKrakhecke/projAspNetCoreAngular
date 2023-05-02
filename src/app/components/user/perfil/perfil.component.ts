import {Component, OnInit} from '@angular/core';
import {AbstractControlOptions, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "@app/services/account/account.service";
import {Router} from "@angular/router";
import {UserUpdate} from "@app/models/identity/user-update";
import {Validator} from "@app/utils/validator";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  userUpdate = {} as UserUpdate
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public accountService: AccountService,
    private router: Router
  ) {
  }

  private validation(): void {
    const formOptions: AbstractControlOptions = {
      validators: Validator.MustMatch('password', 'confirmePassword'),
    };

    this.form = this.fb.group(
      {
        userName: [''],
        titulo: ['NaoInformado', Validators.required],
        primeiroNome: ['', Validators.required],
        ultimoNome: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', [Validators.required]],
        descricao: ['', Validators.required],
        funcao: ['NaoInformado', Validators.required],
        password: ['', [Validators.minLength(4), Validators.nullValidator]],
        confirmePassword: ['', Validators.nullValidator],
      },
      formOptions
    );
  }

  // Conveniente para pegar um FormField apenas com a letra F
  get f(): any {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.carregarUsuario()
  }

  onSubmit(): void {
    this.atualizarUsuario();
  }

  public atualizarUsuario() {
    this.userUpdate = { ...this.form.value };

    this.accountService
      .updateUser(this.userUpdate)
      .subscribe(
        () => alert("usuário atualizado com sucesso"),
        (error) => {;
          console.error(error);
        }
      )
      .add(() => {});
  }

  public resetForm(event: any): void {
    event.preventDefault();
    this.form.reset();
  }

  carregarUsuario(): void {
   this.accountService.getUser().subscribe(
     (userRetorno: UserUpdate) => {
       this.userUpdate = userRetorno
       this.form.patchValue(this.userUpdate)
     },
     (error) => {
       console.log(error)
       this.router.navigate(['/dashboard']);
     },
     () => {}
   )
  }

}
