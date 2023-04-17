import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { EventosService } from "../../services/eventos/eventos.service";
import { Evento } from "../../models/evento.model";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  ngOnInit(): void {
    this.getEventos();
  }

  constructor(
    private eventoService: EventosService,
    private modalService: BsModalService
  ) {
  }

  modalRef?: BsModalRef;
  public eventos: Evento[] = []
  public eventosFiltrados: Evento[] = []

  imageMargin: number = 2
  imageWidth: number = 150
  showImage: boolean = false
  private _listFilter: string = ''

  public get listFilter(): string {
    return this._listFilter
  }

  public set listFilter(value) {
    this._listFilter = value
    this.eventosFiltrados = this.listFilter ? this.filterEvents(this.listFilter) : this.eventos
  }

  filterEvents(filterBy: string): Evento[] {
    filterBy = filterBy.toLowerCase()
    return this.eventos.filter(
      (evento) => evento.tema.toLowerCase().indexOf(filterBy) !== -1 ||
        evento.local.toLowerCase().indexOf(filterBy) !== -1
    )
  }

    getEventos(): void {
    this.eventoService.getEventos().subscribe(eventos => {
      this.eventos = eventos
      this.eventosFiltrados = eventos
    })
  }

  deleteEventos() {

  }
  imageShow(): void {
    this.showImage = !this.showImage
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef?.hide();
  }

  decline(): void {
    this.modalRef?.hide();
  }


}
