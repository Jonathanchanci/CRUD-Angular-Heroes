import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';
import { HttpClient } from '@angular/common/http';
import { map, delay } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url ="https://crud-heroes-f0fa3.firebaseio.com";
  constructor(private http: HttpClient) { }

  crearHeroe(heroe : HeroeModel){
    return this.http.post(`${this.url}/heroes.json`, heroe)
                    .pipe(
                      map ( (resp: any) => {
                        heroe.id = resp.name;
                        return heroe;
                      })
                    );
  }

  actualizarHeroe(heroe: HeroeModel){
    //Clono el modelo
    const heroeTemp = {
      ...heroe
    }
    //elimino el id para no ser generado en FireBase
    delete heroeTemp.id;
    return this.http.put(`${this.url}/heroes/${ heroe.id}.json`, heroeTemp);
  }

  getHeroes(){
    return this.http.get(`${this.url}/heroes.json`)
            .pipe(
              map( this.crearArreglo),
              delay(300)
            );
  }

  getHeroe(id: string){
    return this.http.get(`${this.url}/heroes/${id}.json`);
  }

  deleteHeroe(id: string){
    return this.http.delete(`${ this.url}/heroes/${ id }.json`);
  }

  private crearArreglo(heroesObj: object){
    const heroes: HeroeModel[] = [];
    if (heroesObj === null) return [];

    Object.keys(heroesObj).forEach( key => {
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;
      heroes.push( heroe );
    });

    return heroes;
  }

}
