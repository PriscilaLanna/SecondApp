import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Oferta } from '../shared/oferta.model';
import { OfertasService } from '../ofertas.service';
import { interval, Observable, Observer, Subscription } from 'rxjs';

@Component({
  selector: 'pri-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [OfertasService]
})
export class OfertaComponent implements OnInit {

  public id : number
  public oferta : Oferta

  private tempoObservableSubscription : Subscription
  private meuObservableSubscription  : Subscription

  constructor(private route : ActivatedRoute,
              private ofertasService : OfertasService ) { }

  ngOnInit() {

    this.id = this.route.snapshot.params['id'];
    console.log('ID Snapshot => ',this.route.snapshot.params['id']);

    this.route.params.subscribe(
      (parametro : any )=>{console.log('ID Subscribe => ',parametro.id, parametro)},
      (erro : any ) => { console.log(erro)} ,
      () => {console.log("processamento foi concluído")}//neste caso não foi implementado um encerramento
      );

    this.ofertasService.getOfertaPorId(this.id).
    then((resposta : Oferta ) => {this.oferta = resposta; console.log(this.oferta)});

    let tempo = interval(500);

    this.tempoObservableSubscription = tempo.subscribe((intervalo : number) => {
                                          console.log(intervalo);
                                        })

    //Observable (observável)
    var observableTeste = Observable.create((observer: Observer<number>) => {
      observer.next(1)
      observer.next(3)
      observer.complete()
      observer.next(5)//Já encerrou no complete acima
    })

    //Observable (observador)
    this.meuObservableSubscription = observableTeste.subscribe(
                                        (resposta : number) => {console.log(resposta + 10)},
                                        (erro : any) => {console.log(`Erro${erro}`)},
                                        () => console.log("Encerrado")
                                      )

  }

   ngOnDestroy(){
    this.tempoObservableSubscription.unsubscribe();
    this.meuObservableSubscription.unsubscribe();
   }

}
