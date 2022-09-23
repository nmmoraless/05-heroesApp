import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { HeroeDTO } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  public termino: string = '';
  public heroe!: HeroeDTO;
  public heroes: HeroeDTO[] = [];
  public ocultarInfoHeroe: boolean = false;

  constructor( private heroesService: HeroesService) { }

  ngOnInit(): void {

  }

  buscando( termino: string ) {
    this.heroesService.getSugerencias( termino ).subscribe (
    {
      next: data => {
        this.heroes = data;
    },
    error: (error) => {
      alert(error.message);
    }
  });
  }

  opcionSeleccionada( event: MatAutocompleteSelectedEvent){

    if(!event.option.value){
      this.ocultarInfoHeroe = true;
      return;
    }
    this.ocultarInfoHeroe = false;
    const heroeElegido = event.option.value;
    this.termino = heroeElegido.superhero;
    
    //Suponiendo que no traemos todo el objeto sino solo Id y Nombre, llamaríamos el servicio para traer nuestro heroe con el id seleccionado:

    this.heroesService.getHeroePorId( heroeElegido.id ).subscribe (
      {
        next: data => {
          this.heroe = data;
        },
        error: (error) => {
          alert(error.message)
        }
    });

  }



}
