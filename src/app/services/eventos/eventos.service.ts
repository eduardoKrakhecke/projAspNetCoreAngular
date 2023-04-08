import { Injectable } from '@angular/core';
import { Observable, EMPTY } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Evento } from "../../models/evento.model";
import { endpoints } from "../../constants/endpoints";


@Injectable({
  providedIn: 'root'
})
export class EventosService {

  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<Evento[]> {
    return this.http.get<Evento[]>(endpoints.eventos).pipe(
      map((obj) => obj),
      catchError( e => this.errorHandler(e))
    )
  }

  getById(id: any): Observable<Evento> {
    const url = `${endpoints.eventos}/${id}`
    return this.http.get<Evento>(url).pipe(
      map((obj) => obj),
      catchError( e => this.errorHandler(e))
    )
  }

  update(evento: Evento): Observable<Evento> {
    const url = `${endpoints.eventos}/${evento.eventoId}`
    return this.http.put<Evento>(url, evento).pipe(
      map((obj) => obj),
      catchError( e => this.errorHandler(e))
    )
  }

  save(evento: Evento): Observable<Evento> {
    return this.http.post<Evento>(endpoints.eventos, evento).pipe(
      map((obj) => obj),
      catchError( e => this.errorHandler(e))
    )
  }

  delete(id: any): Observable<Evento> {
    const url = `${endpoints.eventos}/${id}`
    return this.http.delete<Evento>(url).pipe(
      map((obj) => obj),
      catchError( e => this.errorHandler(e))
    )
  }

  errorHandler(e: any): Observable<any> {
    console.log('Ocorreu um erro', e)
    return EMPTY
  }

}
