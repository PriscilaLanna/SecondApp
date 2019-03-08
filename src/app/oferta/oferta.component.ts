import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Oferta } from '../shared/oferta.model';
import { OfertasService } from '../ofertas.service';

@Component({
  selector: 'pri-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [OfertasService]
})
export class OfertaComponent implements OnInit {

  public id : number
  public oferta : Oferta

  constructor(private route : ActivatedRoute,
              private ofertasService : OfertasService ) { }

  ngOnInit() {

    this.id = this.route.snapshot.params['id'];

    console.log('ID Snapshot => ',this.route.snapshot.params['id']);

    this.route.params.subscribe((parametro : any )=>{
      console.log('ID Subscribe => ',parametro.id, parametro);
    });

    this.ofertasService.getOfertaPorId(this.id).
    then((resposta : Oferta ) => {this.oferta = resposta; console.log(this.oferta)});
  }

}
