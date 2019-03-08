import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertasService } from '../../ofertas.service';

@Component({
  selector: 'pri-onde-fica',
  templateUrl: './onde-fica.component.html',
  styleUrls: ['./onde-fica.component.css']
})
export class OndeFicaComponent implements OnInit {
 
  public ondeFica : string = ''

  constructor(private route : ActivatedRoute,
              private ofertasServices : OfertasService) { }

  ngOnInit() {
    let id = this.route.parent.snapshot.params['id'];
    console.log(id)

    this.ofertasServices.getOndeFicaPorId(id)
      .then(( resposta : any) => { this.ondeFica = resposta } );
  }

}