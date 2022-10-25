import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap, of } from 'rxjs';
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

  verificaAutenticacion(): Observable<boolean> {
    if( !localStorage.getItem('id')){
      return of(false);
    }
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
            .pipe(
              map( auth => {
                this._auth = auth;
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

  logout(){
    this._auth = undefined;
    localStorage.clear();
  }
}
