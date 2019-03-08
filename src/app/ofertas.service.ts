import { HttpClient  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Oferta } from './shared/oferta.model';
import { URI_API } from './app.api';

@Injectable()
export class OfertasService{
  
  //private uri_api : string = "http://localhost:3000/ofertas/" 

  constructor(private http : HttpClient){}

    public getOfertas(): Promise<Array<Oferta>>{
      return  this.http.get(`${URI_API}/ofertas/?destaque=true`)
              .toPromise()
              .then((resposta:any)=> {return resposta});
    }

    public getOfertasPorCategoria(categoria: string) : Promise<Array<Oferta>>{
      return  this.http.get(`${URI_API}/ofertas/?categoria=${categoria}`)
              .toPromise()
              .then((resposta : any) => {return resposta});
    }

    public getOfertaPorId(id : number): Promise<Oferta>{
      return this.http.get(`${URI_API}/ofertas/?id=${id}`)
              .toPromise()
              .then((resposta : any) => {return resposta.shift()})
    }

    public getComoUsarPorId(id : number) : Promise<string>{
      return this.http.get(`${URI_API}/como-usar/?id=${id}`)
              .toPromise()
              .then((resposta : any) => { return resposta[0].descricao });
    }

    public getOndeFicaPorId(id : number) : Promise<string>{
      return this.http.get(`${URI_API}/onde-fica/?id=${id}`)
              .toPromise()
              .then((resposta : any ) => { return resposta[0].descricao });
    }
}
