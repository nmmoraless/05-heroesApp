import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HeroeDTO } from '../interfaces/heroe.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = environment.baseUrl;

  constructor( private http: HttpClient) { }

  getHeroes(){
    return this.http.get<HeroeDTO[]>(`${this.baseUrl}/heroes`);
  }

  getHeroePorId( id: string ) {
    return this.http.get<HeroeDTO>(`${this.baseUrl}/heroes/${id}`);
  }

  getSugerencias( termino: string ): Observable<HeroeDTO[]>{
    return this.http.get<HeroeDTO[]>(`${this.baseUrl}/heroes?q=${termino}&_limit=6`);
  }
}
