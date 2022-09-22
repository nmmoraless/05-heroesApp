import { Component, OnInit } from '@angular/core';
import { HeroeDTO } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [
  ]
})
export class ListadoComponent implements OnInit {

  public heroes: HeroeDTO[] = [];

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
    
    this.heroesService.getHeroes().subscribe(
      {
        next: data => {
          this.heroes = data;
      },
      error: (error) => {
        alert(error.message);
      }
    });
  }

}
