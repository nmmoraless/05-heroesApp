import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  get auth(): Auth{
    return {...this._auth!};
  }

  constructor(private http: HttpClient) { }

  verificaAutenticacion(): Observable<boolean> | boolean {
    if( !localStorage.getItem('id')){
      return false;
    }
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
            .pipe(
              map( auth => {
                console.log('map', auth);
                return true;
              })
            )
  }

  login(): Observable<Auth>{
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
        .pipe(
          tap( auth => {
            this._auth = auth;
            console.log('Hola soy el servicio de login desde el tap');            
          }),
          tap( auth => localStorage.setItem('id', auth.id)));
  }
}
