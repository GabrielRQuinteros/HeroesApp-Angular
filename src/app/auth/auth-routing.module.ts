import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

// https://localhost:4200/auth/
const routes: Routes = [
  {
    path: '', //https://localhost:4200/auth/
    component: LayoutPageComponent,
    children: [
      {
        path: 'login', //https://localhost:4200/auth/login
        component: LoginPageComponent,
      },
      {
        path: 'register', //https://localhost:4200/auth/register
        component: RegisterPageComponent,
      },
      {
        path: '**', //https://localhost:4200/auth/cualquierCosa
        redirectTo: 'login',
      }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
