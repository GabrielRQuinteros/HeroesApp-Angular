import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from '../../environments/environments.dev';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseURL: string = environments.backendBaseUrl;


  constructor(private httpClient: HttpClient ) { }



  public getHeroes(): Observable<Hero[]> {
      return this.httpClient.get<Hero[]>( this.getHeroesUrl() );
  }

  private getHeroesUrl(): string {
    return `${this.baseURL}/heroes`;
  }


}
