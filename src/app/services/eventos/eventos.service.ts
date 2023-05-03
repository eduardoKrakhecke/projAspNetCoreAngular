import { Injectable } from '@angular/core';
import { Observable, EMPTY } from "rxjs";
import {catchError, map, take} from "rxjs/operators";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { Evento } from "../../models/evento.model";
import { endpoints } from "../../constants/endpoints";
import { messages } from "../../constants/messages"
import {PaginatedResult} from "@app/models/pagination";


@Injectable(
  //{providedIn: 'root'}
)
export class EventosService {

  constructor(
    private http: HttpClient
  ) { }

  baseURL = 'https://localhost:5001/api/eventos';

   getEventos(page?: number, itemsPerPage?: number, term?: string): Observable<PaginatedResult<Evento[]>> {
    const paginatedResult: PaginatedResult<Evento[]> = new PaginatedResult<Evento[]>();

    let params = new HttpParams;

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }

    if (term != null && term != '')
      params = params.append('term', term)

    return this.http
      .get<Evento[]>(this.baseURL, {observe: 'response', params })
      .pipe(
        take(1),
        map((response) => {
          // @ts-ignore
          paginatedResult.result = response.body;
          if(response.headers.has('Pagination')) {
            // @ts-ignore
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        }));
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
