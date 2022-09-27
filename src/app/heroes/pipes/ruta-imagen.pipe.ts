import { Pipe, PipeTransform } from '@angular/core';
import { HeroeDTO } from '../interfaces/heroe.interface';

@Pipe({
  name: 'imagen'
})
export class RutaImagenPipe implements PipeTransform {

  transform(heroe: HeroeDTO): string {
    if ( !heroe.id && !heroe.altImg){
      return `assets/no-image.png`; 
    } else if ( heroe.altImg ){
      return heroe.altImg;
    } else if (heroe.altImg === ""){
      return `assets/no-image.png`; 
    } else {
      return `assets/heroes/${heroe.id}.jpg`;
    }
  }

}
