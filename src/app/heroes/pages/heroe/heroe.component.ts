import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroeDTO } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 5px;
    }
  `
  ]
})

export class HeroeComponent implements OnInit {
  
  public paramsUrlID: string = '';
  public heroe!: HeroeDTO;

  constructor( private activateRoute: ActivatedRoute, 
               private heroesService: HeroesService,
               private router: Router) { }

  ngOnInit(): void {

    this.paramsUrlID = this.activateRoute.snapshot.params['id'];
  
    this.heroesService.getHeroePorId( this.paramsUrlID ).subscribe(
      {
        next: data => {
          this.heroe = data;    
      },
      error: (error) => {
        alert(error.message);
      }
    });
  
  }

  regresar():void {
    this.router.navigate(['/heroes/listado']);
  }

}
