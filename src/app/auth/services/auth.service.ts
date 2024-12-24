import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../environments/environments.dev';
import { User } from '../interfaces/user.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {


  private baseURL: string = environments.backendBaseUrl;
  private user?: User;

  constructor(private httpClient: HttpClient) { }

  /// GET URLS METHODS ////////////////////////

  private getLoginURL(email: string, password: string): string {
    /// LO CORRECTO ES USAR PETICIONES CON "POST", ESTO TE PROTEGE DE NO EXPONER LAS CREDENCIALES EN EL URL DE LA PETICIÓN
    /// IMAGINARSE QUE DESPUÉS EN EL HISTORIAL DEL NAVEGADOR PODRÍAN APARECER LAS CREDENCIALES SI USAMOS GET.
    /// HASTA QUE NO TENGA EL BACKEND BIEN IMPLEMENTADO USAMOS GET
    // TODO: CAMBIAR A PETICIONES POST, LUEGO DE HACER E BACKEND EN NODE.

    return `${this.baseURL}/users/1`; //REEMPLAZAR
  }

  get currentUser(): User|undefined{
    if(! this.user) return undefined;
    return structuredClone(this.user); /// HACE UN CLONADO PROFUNDO PARA NO PASAR EL USUARIO POR REFERENCIA
  }

  public login( email: string, password: string ): Observable<User>{

    /// NOTA: LA FORMA CORRECTA DE GUARDAR EL TOKEN ES HACERLO EN UNA COOKIE, PARA EVITAS CROSS-SITE SCRIPTING
    /// QUE PUEDE LLEVAR AL ROBO DEL TOKEN.
    /// TODO: PRACTICA RECOMENDADA, MANEJAR EL TOKEN CON LIBRERÍA JS-COOKIE PARA GUARDAR EL TOKEN.
    return this.httpClient.get<User>( this.getLoginURL( email, password ) )
                          .pipe(
                            tap( user =>  this.user = user ),
                            tap( user => localStorage.setItem("token", `${user.id}`) ),
                          );
  }

  public logout() {
    this.user = undefined;
    localStorage.clear();
  }


  public checkAuthentication(): Observable<boolean> {

    const token = localStorage.getItem("token");

    if( !token ) return of(false);

    return this.httpClient.get<User>( `${this.baseURL}/users/1`)
                   .pipe(
                          tap( user => this.user = user ),
                          map( user => !!user ),
                          catchError( error =>  of(false)),
                    );

  }

}
