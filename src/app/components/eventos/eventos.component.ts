import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { EventosService } from "../../services/eventos/eventos.service";
import { Evento } from "../../models/evento.model";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { ToastService } from "../shared/toast/toast.service";
import { messages } from '../../constants/messages';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  ngOnInit(): void {
  }



}
