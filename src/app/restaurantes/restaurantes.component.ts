import { Component, OnInit } from '@angular/core';
import { Oferta } from '../shared/oferta.model';
import { OfertasService} from '../ofertas.service';

@Component({
  selector: 'pri-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.css'],
  providers: [ OfertasService]
})
export class RestaurantesComponent implements OnInit {

  public ofertas : Array<Oferta>

  constructor(private ofertasService : OfertasService) { }

  ngOnInit() {
    this.ofertasService.getOfertasPorCategoria("restaurante")
    .then((resposta : any)=>{ console.log(resposta); this.ofertas = resposta});
  }

}
