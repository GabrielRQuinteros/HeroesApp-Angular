import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, GuardResult, MaybeAsync, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { map, Observable, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PublicGuard implements CanMatch, CanActivate{

  constructor( private authService: AuthService,
               private router: Router,
   ) { }

  private checkAuthStatus(): Observable<boolean> {
     return this.authService.checkAuthentication().pipe(
                     tap( ( isAutenticated ) => {
                       if(  isAutenticated )
                         this.router.navigate(['./']);
                     }),
                     map(isAuthenticated => ! isAuthenticated)
                   );
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
     return this.checkAuthStatus();
   }

  public canMatch(route: Route, segments: UrlSegment[]): Observable<boolean> {
     return this.checkAuthStatus();

   }
}
