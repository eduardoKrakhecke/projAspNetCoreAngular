import {Component, OnInit, TemplateRef} from '@angular/core';
import {EventosService} from "@app/services/eventos/eventos.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ToastService} from "@app/components/shared/toast/toast.service";
import {Evento} from "@app/models/evento.model";
import {messages} from "@app/constants/messages";
import {Router} from "@angular/router";
import {Pagination, PaginatedResult} from "@app/models/pagination";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-evento-listagem',
  templateUrl: './evento-listagem.component.html',
  styleUrls: ['./evento-listagem.component.scss']
})
export class EventoListagemComponent implements OnInit {


  ngOnInit(): void {
    this.pagination = { currentPage: 1, itemsPerPage: 3, totalItems: 1 } as Pagination
    this.getEventos();
  }

  constructor(
    private eventoService: EventosService,
    private modalService: BsModalService,
    private toastService: ToastService,
    private route: Router
  ) {
  }

  public pagination = {} as Pagination

  modalRef?: BsModalRef;
  public eventos: Evento[] = []
  public eventosFiltrados: Evento[] = []
  eventoId: number

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
    this.eventoService.getEventos(this.pagination.currentPage, this.pagination.itemsPerPage).subscribe(
       (response: PaginatedResult<Evento[]>) => {
         this.eventos = response.result
         this.eventosFiltrados = this.eventos
         this.pagination = response.pagination
      },
      error => {
         console.log(error)
      }
  )
  }

  deleteEventos() {

  }
  imageShow(): void {
    this.showImage = !this.showImage
  }

  openModal(event: any, template: TemplateRef<any>, eventoId: any) {
    event.stopPropagation()
    this.eventoId = eventoId
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    //this.spinner.show()
    this.modalRef?.hide();
    this.eventoService.delete(this.eventoId).subscribe(
      (result)=> {
        if( result.message === 'Deletado') {
          this.getEventos()
          alert("Evento deletado")
        }
      },
      (error)=> {
        console.log('Ocorreu um erro')
      },
      ()=> {}
    )//.add(()=> this.spinner.hide())
    this.toastService.show(messages.SUCESSO_EXCLUIR, 'success')
  }

  decline(): void {
    this.modalRef?.hide();
  }

  detalheEvento(id: number | undefined): void {
    this.route.navigate([`eventos/detalhe/${id}`]);
  }

  pageChanged(event: any): void {
   this.pagination.currentPage = event.page
    this.getEventos()
  }

}
