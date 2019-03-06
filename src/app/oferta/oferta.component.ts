import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'pri-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css']
})
export class OfertaComponent implements OnInit {

  constructor(private route : ActivatedRoute) { }

  ngOnInit() {
    console.log('ID => ',this.route.snapshot.params['id']);
  }

}
