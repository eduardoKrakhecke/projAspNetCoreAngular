import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { EventosComponent } from "./components/eventos/eventos.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { ContatosComponent } from "./components/contatos/contatos.component";
import { PerfilComponent } from "./components/user/perfil/perfil.component";
import { PalestrantesComponent } from "./components/palestrantes/palestrantes.component";
import { EventoDetalheComponent } from "./components/eventos/evento-detalhe/evento-detalhe.component";
import { EventoListagemComponent } from "./components/eventos/evento-listagem/evento-listagem.component";
import { UserComponent } from "./components/user/user.component";
import { LoginComponent } from "./components/user/login/login.component";
import { RegistrationComponent } from "./components/user/registration/registration.component";

const routes: Routes = [
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'login', component: LoginComponent},
      { path: 'registration', component: RegistrationComponent},
    ],
  },
  { path: 'user/perfil', component: PerfilComponent },
  { path: 'eventos', redirectTo: 'eventos/lista'},
  {
    path: 'eventos', component: EventosComponent,
    children: [
      { path: 'detalhe/:id', component: EventoDetalheComponent} ,
      { path: 'detalhe', component: EventoDetalheComponent },
      { path: 'lista', component: EventoListagemComponent }
    ]
  },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'contatos', component: ContatosComponent },
  { path: 'palestrantes', component: PalestrantesComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
