import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { EventosComponent } from "./components/eventos/eventos.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { ContatosComponent } from "./components/contatos/contatos.component";
import { PerfilComponent } from "./components/perfil/perfil.component";
import { PalestrantesComponent } from "./components/palestrantes/palestrantes.component";

const routes: Routes = [
  { path: 'eventos', component: EventosComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'contatos', component: ContatosComponent },
  { path: 'perfil', component: PerfilComponent },
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
