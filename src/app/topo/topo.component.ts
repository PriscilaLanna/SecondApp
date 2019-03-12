import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Observable } from 'rxjs';
import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'pri-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {

  private ofertasObs : Observable<Oferta[]>

  constructor(private ofertasService : OfertasService) { }

  ngOnInit() {
  }

  public pesquisar(termoPesquisa : string) : void{
    console.log( termoPesquisa)
  }

  public pesquisaOfertas(termoPesquisa : string ) : void{
    this.ofertasObs =  this.ofertasService.pesquisaOfertas(termoPesquisa);
    this.ofertasObs.subscribe(
      (ofertas: Oferta[]) => {console.log(ofertas)},
      (erro => console.log(`Erro status ${erro.status}`)),
      () => console.log("Fluxo de evento completo")//partindo do observable do metodo get já tem a conclusão da sua stream
    )
  }

}
