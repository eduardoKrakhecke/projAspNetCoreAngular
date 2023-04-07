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

  errorHandler(e: any): Observable<any> {
    console.log('Ocorreu um erro', e)
    return EMPTY
  }

}
