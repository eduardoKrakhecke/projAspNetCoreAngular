import { Component, OnInit } from '@angular/core';
import { EventosService } from "../../services/eventos/eventos.service";
import { Evento } from "../../models/evento.model";


@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  ngOnInit(): void {
    this.getEventos()
  }

  constructor(private eventoService: EventosService) {
  }


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

  filterEvents(filterBy: string): any {
    filterBy = filterBy.toLowerCase()
    return this.eventos.filter(
      (evento) => evento.tema.toLowerCase().indexOf(filterBy) !== -1 ||
        evento.local.toLowerCase().indexOf(filterBy) !== -1
    )
  }

  public getEventos(): void {
    this.eventoService.get().subscribe(eventos => {
      this.eventos = eventos
      this.eventosFiltrados = eventos
    })
  }
  imageShow() {
    this.showImage = !this.showImage
  }


}
