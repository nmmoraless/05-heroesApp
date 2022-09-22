import { Pipe, PipeTransform } from '@angular/core';
import { HeroeDTO } from '../interfaces/heroe.interface';

@Pipe({
  name: 'imagen'
})
export class RutaImagenPipe implements PipeTransform {

  transform(heroe: HeroeDTO): string {
    return `assets/heroes/${heroe.id}.jpg`;
  }

}
