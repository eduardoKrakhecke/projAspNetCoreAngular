import {NgModule, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {FormsModule} from "@angular/forms";
import localePt from '@angular/common/locales/pt'

import {AppComponent} from './app.component';
import {EventosComponent} from './components/eventos/eventos.component';
import {PalestrantesComponent} from './components/palestrantes/palestrantes.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {registerLocaleData} from "@angular/common";
import {NavComponent} from './components/shared/nav/nav.component';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";

import {ModalConfirmComponent} from './components/shared/modal-confirm/modal-confirm.component';
import {ModalModule} from "ngx-bootstrap/modal";
import {EventosService} from "./services/eventos/eventos.service";
import { DateTimeFormatPipe } from './utils/date-time-format.pipe';
import { TitleComponent } from './components/shared/title/title.component';
import { ContatosComponent } from './components/contatos/contatos.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PerfilComponent } from './components/user/perfil/perfil.component';
import { ToastComponent } from './components/shared/toast/toast.component';
import { EventoDetalheComponent } from './components/eventos/evento-detalhe/evento-detalhe.component';
import { EventoListagemComponent } from './components/eventos/evento-listagem/evento-listagem.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegistrationComponent } from './components/user/registration/registration.component';


registerLocaleData(localePt)

@NgModule({
  declarations: [
    AppComponent,
    EventosComponent,
    PalestrantesComponent,
    NavComponent,
    ModalConfirmComponent,
    DateTimeFormatPipe,
    TitleComponent,
    ContatosComponent,
    DashboardComponent,
    PerfilComponent,
    ToastComponent,
    EventoDetalheComponent,
    EventoListagemComponent,
    UserComponent,
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
  ],
  providers: [
    EventosService,
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR',
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
}
