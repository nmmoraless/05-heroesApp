import { Component, Input, OnInit } from '@angular/core';
import { HeroeDTO } from '../../interfaces/heroe.interface';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroeTarjeta.component.html',
  styles: [`
    mat-card {
      margin-top: 20px
    }
  `
  ]
})
export class HeroeTarjetaComponent implements OnInit {

  @Input() heroe!: HeroeDTO;

  constructor() { }

  ngOnInit(): void {
  }

}
