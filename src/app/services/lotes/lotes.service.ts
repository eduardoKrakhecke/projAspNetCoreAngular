import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { endpoints } from "@app/constants/endpoints";
import { catchError, map } from "rxjs/operators";
import { Observable, EMPTY } from "rxjs";
import { messages } from "@app/constants/messages";
import { Lote } from "@app/models/lote.model";


@Injectable({
  providedIn: 'root'
})
export class LotesService {

  constructor( private http: HttpClient) { }


  getLotesByEventoId(eventoId: number): Observable<Lote[]> {
    const url = `${endpoints.lotes}/${eventoId}`
    return this.http.get<Lote[]>(url).pipe(
      map((obj) => obj),
      catchError( e => this.errorHandler(e))
    )
  }

  saveLote(eventoId: number, lotes: Lote[]): Observable<Lote[]> {
    const url = `${endpoints.lotes}/${eventoId}`
    return this.http.put<Lote>(url, lotes).pipe(
      map((obj) => obj),
      catchError( e => this.errorHandler(e))
    )
  }

  deleteLote(eventoId: number, loteId: number): Observable<any> {
    const url = `${endpoints.lotes}/${eventoId}/${loteId}`
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
