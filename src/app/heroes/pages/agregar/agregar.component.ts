import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
  ]
})
export class AgregarComponent implements OnInit {

  public paramsUrlID: string = '';

  constructor( private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {

  this.paramsUrlID = this.activateRoute.snapshot.params['id'];
  console.log(this.paramsUrlID);
  
  }
}
