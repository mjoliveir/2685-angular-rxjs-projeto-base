import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { catchError, debounceTime, filter, map, Subscription, switchMap, tap, throwError } from 'rxjs';
import { Item, Livro, LivrosResultado } from 'src/app/models/interfaces';
import { livroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent{
  constructor(private service: LivroService) { }
  campoBusca = new FormControl()
  pausa = 300
  livrosResultado: LivrosResultado
  



  mensagemErro = '' 

  livrosEncontrados$ = this.campoBusca.valueChanges
    .pipe(
      debounceTime(this.pausa),
      filter((valorDigitado) => valorDigitado.length >= 3),
      //tap(() =>console.log('ai')),
      switchMap((valordigitado) => this.service.buscar(valordigitado)),
      //tap(()=> console.log('ui')),
      map(resultado => resultado.items ?? []),
      map((items) => this.livrosResultadosParaLivros(items)),
      catchError(erro => {
        console.log(erro)
        return throwError(() => new Error(this.mensagemErro='Ops, ocorreu um erro. Recarregue a aplicação'))
      })
    ) 

      totalDeLivros$ = this.campoBusca.valueChanges
    .pipe(
      debounceTime(this.pausa),
      filter((valorDigitado) => valorDigitado.length >= 3),
      tap(() =>console.log('ai')),
      switchMap((valordigitado) => this.service.buscar(valordigitado)),
      tap(()=> console.log('ui')),
      map(resultado => this.livrosResultado = resultado),
      tap(() => console.log(this.livrosResultado.totalItems)),
      catchError(() => {
        return throwError(() => new Error(this.mensagemErro ='Ops, ocorreu um erro. Recarregue a aplicação'))
      })  
    )

livrosResultadosParaLivros(items: Item[]): livroVolumeInfo[]{
  return items.map(item =>{
    return new livroVolumeInfo(item)
  })
}

 
}




