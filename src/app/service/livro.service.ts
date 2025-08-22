import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Item, LivrosResultado } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LivroService {
  private readonly API = 'https://www.googleapis.com/books/v1/volumsses'
  constructor(private http: HttpClient) { }


  buscar(valorDigitado: string): Observable<LivrosResultado>{ // observable
    const params = new HttpParams().append( 'q', valorDigitado )
     return this.http.get<LivrosResultado>(this.API, {params})//.pipe(
  //     tap((retorno) => console.log(retorno)),
  //     //map(resultado => resultado.items ?? []),
  //     tap(resultado => console.log('fluxo apos o map', resultado))
  //   ) // quando queremos uma resposta tipada, temos também que tipar o get do http client
    
  // }
}
}
