import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from '../../environments/environments.dev';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseURL: string = environments.backendBaseUrl;

  private pagesLimit: number = 6;

  constructor(private httpClient: HttpClient ) { }




  // URLS BUILDERS
  private getHeroesUrl(): string {
    return `${this.baseURL}/heroes`;
  }

  public getHeroByURL( id: string ): string {
    return `${this.baseURL}/heroes/${id}`;
  }

  public getHeroesSuggestionsByNameURL(name: string): string {
    return `${this.baseURL}/heroes?q=${name}&_limit=${this.pagesLimit}`;
  }


  // REQUEST METHODS
  public getHeroes(): Observable<Hero[]> {
      return this.httpClient.get<Hero[]>( this.getHeroesUrl() );
  }

  public getHeroById( id: string ): Observable<Hero | undefined> {
    return this.httpClient.get<Hero | undefined>( this.getHeroByURL(id) )
                          .pipe(
                            catchError( error => of(undefined) )
                          );
  }

  public getHeroesSuggestionsByName( name: string ): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>( this.getHeroesSuggestionsByNameURL(name) )
                          .pipe(
                            catchError( error => of([]))
                          );
  }

}
