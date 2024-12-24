import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, GuardResult, MaybeAsync, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { filter, map, Observable, of, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanMatch, CanActivate{


  // NOTA: ¿ QUE SON LOS GUARDS ?
  /**
   * Los Guards son servicios que se usan para controlar la navegación entre rutas en una aplicación.
   * Actúan como "guardianes" que deciden si se permite o no el acceso a una ruta específica.
   * Son muy útiles para implementar funcionalidades como autenticación, autorización, o la verificación de datos antes de cargar una página.
   * Angular provee varios tipos de Guards, que son implementados como clases que extienden interfaces específicas de @angular/router:
   * Estas interfaces son:
   * 1- CanMatch: CanMatch controla si una configuración de ruta coincide con la URL solicitada antes de cargar el módulo o componente.
   *    Se utiliza principalmente en lugar de CanLoad para mayor flexibilidad, ya que también funciona con rutas cargadas de manera inmediata,
   *    no solo Lazy Loaded. Es ideal para escenarios donde necesitas lógica personalizada para decidir si una ruta debe coincidir.
   *
   * 2- CanActivate: Permite o bloquea el acceso a una ruta antes de que se active.
   *                 Se usa comúnmente para proteger rutas y verificar si el usuario está autenticado.
   *                 Si no cumple las condiciones, redirige a otra página.
   *
   * 3- CanActivateChild: Aplica las mismas reglas de acceso que CanActivate, pero específicamente para rutas hijas dentro de una ruta principal.
   *                      Útil para controlar el acceso a secciones completas de la aplicación.
   *
   * 4- CanDeactivate: Previene que el usuario abandone una página si hay cambios sin guardar.
   *                   Muestra un mensaje de confirmación para evitar la pérdida de datos antes de navegar a otra ruta
   *
   * 5- Resolve: Carga datos necesarios antes de activar una ruta, garantizando que el componente tenga acceso a ellos al renderizarse.
   *             Ideal para páginas que dependen de datos preprocesados.
   */


  constructor( private authService: AuthService, private router: Router ) { }

  private checkAuthStatus(): Observable<boolean> {
    return this.authService.checkAuthentication().pipe(
                    tap( ( isAutenticated ) => {
                      if( ! isAutenticated )
                        this.router.navigate(['./auth/login']);
                    }),
                  );
  }




  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkAuthStatus();

  }

  canMatch(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.checkAuthStatus();

  }

  /** canActivate()  vs canMatch() DIFERENCIA
   * ------------------------------------------
   * Primero tengamos en cuenta este contexto: Estoy en una Ruta "A" y quiero llegar a una ruta "B".
   * 1- canMatch(): El código de guard se ejecuta antes de cambiar de ruta, osea, la activeRoute es "A" y se pueden acceder a los params de "A".
   * 2- canActivate(): El código del guard se ejecuta después de cambiar de ruta y "ANTES de que se carguen los componentes en "B" ".
   *                   La activatedRoute es "B", por lo tanto se pueden acceder a los params de "B".
   *
   */


}
