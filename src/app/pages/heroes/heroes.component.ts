import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';
import { HeroeModel } from 'src/app/models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroesList : HeroeModel[] = [];
  cargando: boolean = true;
  constructor( private heroesService : HeroesService) { }

  ngOnInit() {
    this.heroesService.getHeroes().
        subscribe(resp =>{
          this.heroesList = resp;
          this.cargando = false;
        });
  }

  borrarHeroe(heroe: HeroeModel, i: number){
    Swal.fire({
      title: "¿Está seguro?",
      text: `Está seguro que desea borrar a ${ heroe.nombre }`,
      icon: "question",
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp =>{
      if (resp.value) {
        this.heroesList.splice(i , 1);
        this.heroesService.deleteHeroe( heroe.id ).subscribe();
      }
    })
    ;

  }

}
