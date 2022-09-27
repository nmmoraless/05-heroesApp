import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { HeroeDTO } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 5px;
    }
  `
  ]
})
export class AgregarComponent implements OnInit {

  public publisher = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];

  public heroe: HeroeDTO = new HeroeDTO();

  constructor(private heroesService: HeroesService, private activedRoute: ActivatedRoute,  private router: Router) { }

  ngOnInit(): void { 

    if(!this.router.url.includes('editar')){
      return;
    }
    this.activedRoute.params.pipe(
      switchMap( ({id}) => this.heroesService.getHeroePorId( id ) )
    ).subscribe ( heroe => {
      this.heroe = heroe;
    });
  }

  public guardar(){
    if( this.heroe.superhero.trim().length === 0){
      return alert('El héroe debe tener un nombre');
    }
    if(this.heroe.id){
      this.heroesService.actualizarHeroe(this.heroe).subscribe( heroe => {
        console.log('Respuesta', heroe); 
        alert(`Héreoe actualizado exitosamente`) ;
        this.router.navigate(['/heroes/listado']);
      })
    } else {
      this.heroesService.agregarHeroe(this.heroe)
        .subscribe( data => {
          console.log('Respuesta', data);
          alert(`Héreoe creado exitosamente`) ;
        this.router.navigate(['/heroes/listado']);        
        });
    }
  }

  public eliminar(heroe: HeroeDTO){
    this.heroesService.eliminarHeroe(heroe.id).subscribe( resp => {
      alert(`El héroe ${heroe.superhero}, ha sido eliminado exitosamente`);
      this.router.navigate(['/heroes/listado']); 
    })
  }
}
///////////////////CONTINUAR EN VIDEO 210
