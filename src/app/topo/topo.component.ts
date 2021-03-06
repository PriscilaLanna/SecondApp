import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Observable, Subject, of } from 'rxjs';
import { Oferta } from '../shared/oferta.model';
import { switchMap, debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators';

@Component({
  selector: 'pri-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {

  private ofertasObs : Observable<Oferta[]>
  private ofertaSubject : Subject<string> = new Subject<string>()
  private ofertas : Array<Oferta>

  constructor(private ofertasService : OfertasService) { }

  ngOnInit() {
    this.ofertasObs = this.ofertaSubject.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(termo => {

        if(termo.trim() === '')
          return of<Oferta[]>([])

        console.log("requesição para api");
        return this.ofertasService.pesquisaOfertas(termo)
      }),
      catchError(error => {
        console.log(error);
        return of<Oferta[]>([])
      })
    )

    this.ofertasObs.subscribe(ofertas =>{
        console.log(ofertas)
        this.ofertas = ofertas
      }
    )
  }

  public pesquisaOfertasSubject(termoPesquisa: string): void{
    console.log("evento keyup", termoPesquisa);
    this.ofertaSubject.next(termoPesquisa)
  }

  //teste
  public pesquisar(termoPesquisa : string) : void{
    console.log( termoPesquisa)
  }

  //teste só observable
  public pesquisaOfertas(termoPesquisa : string ) : void{
    this.ofertasObs =  this.ofertasService.pesquisaOfertas(termoPesquisa);
    this.ofertasObs.subscribe(
      (ofertas: Oferta[]) => {console.log(ofertas)},
      (erro => console.log(`Erro status ${erro.status}`)),
      () => console.log("Fluxo de evento completo")//partindo do observable do metodo get já tem a conclusão da sua stream
    )
  }

}
