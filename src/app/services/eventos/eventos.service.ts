import { Injectable } from '@angular/core';
import { Observable, EMPTY } from "rxjs";
import { catchError, map } from "rxjs/operators";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Evento } from "../../models/evento.model";
import { endpoints } from "../../constants/endpoints";
import { messages } from "../../constants/messages"


@Injectable(
  //{providedIn: 'root'}
)
export class EventosService {

  tokenHeader = new HttpHeaders( {

    'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
  })

  constructor(
    private http: HttpClient
  ) { }

  getEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(endpoints.eventos, { headers: this.tokenHeader}).pipe(
      map((obj) => obj),
      catchError( e => this.errorHandler(e))
    )
  }

  getEventosByTema(tema: string): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${endpoints.eventos}/${tema}/tema`).pipe(
      map((obj) => obj),
      catchError( e => this.errorHandler(e))
    )
  }

  getEventoById(id: any): Observable<Evento> {
    const url = `${endpoints.eventos}/${id}`
    return this.http.get<Evento>(url).pipe(
      map((obj) => obj),
      catchError( e => this.errorHandler(e))
    )
  }

  put(evento: Evento): Observable<Evento> {
    const url = `${endpoints.eventos}/${evento.id}`
    return this.http.put<Evento>(url, evento).pipe(
      map((obj) => obj),
      catchError( e => this.errorHandler(e))
    )
  }

  post(evento: Evento): Observable<Evento> {
    return this.http.post<Evento>(endpoints.eventos, evento).pipe(
      map((obj) => obj),
      catchError( e => this.errorHandler(e))
    )
  }

  delete(id: any): Observable<any> {
    const url = `${endpoints.eventos}/${id}`
    return this.http.delete<string>(url).pipe(
      map((obj) => obj),
      catchError( e => this.errorHandler(e))
    )
  }

  errorHandler(e: any): Observable<any> {
    console.log(messages.ERRO_GENERICO, e)
    return EMPTY
  }

}
