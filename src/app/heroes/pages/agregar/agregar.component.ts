import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
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

  constructor(private heroesService: HeroesService, 
              private activedRoute: ActivatedRoute,  
              private router: Router,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) { }

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
        this.mostarSnackBar('Héreoe actualizado exitosamente');
        this.router.navigate(['/heroes/listado']);
      })
    } else {
      this.heroesService.agregarHeroe(this.heroe)
        .subscribe( data => {
          console.log('Respuesta', data);
            this.mostarSnackBar('Héreoe creado exitosamente');
        this.router.navigate(['/heroes/listado']);        
        });
    }
  }

  public eliminar(heroe: HeroeDTO){

    const dialog =  this.dialog.open( ConfirmarComponent, {
      width: '250px',
      data: {...heroe}
    });

    dialog.afterClosed().subscribe(
      (result) => {
        if(result){
          this.heroesService.eliminarHeroe(heroe.id).subscribe( resp => {
            this.mostarSnackBar(`El héroe ${heroe.superhero}, ha sido eliminado exitosamente`);
            this.router.navigate(['/heroes/listado']); 
          });
        } else {
          return;
        }
      }
    )

  }

  public mostarSnackBar( mensaje: string ){
    this.snackBar.open( mensaje, 'Ok!', {
      duration: 2500
    });
  }
}
///////////////////CONTINUAR EN VIDEO 210
