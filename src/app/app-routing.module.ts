import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import ('./auth/auth.module').then( m => m.AuthModule ),
  },
  {
    path: 'heroes',
    loadChildren: () => import ( './heroes/heroes.module' ).then( m=> m.HeroesModule ),
  },
  {
    path: '404',
    component: Error404PageComponent,
  },
  {
    path: '',
    redirectTo: 'heroes',
    pathMatch: 'full'   // <-- Esto es para que machee exactamente con vació, sino puede tomar como vació '/auth', porque interpreta que entre / y auth hay vació.
  },
  {
    path: '**', // <-- Indica que para el resto de los demás path, redirija al 404 Not Found
    redirectTo: '404',
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
