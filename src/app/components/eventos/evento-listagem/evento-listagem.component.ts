import {Component, OnInit, TemplateRef} from '@angular/core';
import {EventosService} from "@app/services/eventos/eventos.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ToastService} from "@app/components/shared/toast/toast.service";
import {Evento} from "@app/models/evento.model";
import {messages} from "@app/constants/messages";
import {Router} from "@angular/router";

@Component({
  selector: 'app-evento-listagem',
  templateUrl: './evento-listagem.component.html',
  styleUrls: ['./evento-listagem.component.scss']
})
export class EventoListagemComponent implements OnInit {


  ngOnInit(): void {
    this.getEventos();
  }

  constructor(
    private eventoService: EventosService,
    private modalService: BsModalService,
    private toastService: ToastService,
    private route: Router
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
    this.toastService.show(messages.SUCESSO_EXCLUIR, 'success')
  }

  decline(): void {
    this.modalRef?.hide();
  }

  detalheEvento(id: number | undefined): void {
    this.route.navigate([`eventos/detalhe/${id}`]);
  }

}
