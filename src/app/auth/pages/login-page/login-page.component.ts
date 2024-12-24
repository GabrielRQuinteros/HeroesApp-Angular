import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: false,

  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {


  constructor( private authService: AuthService,
               private router: Router
   ){}


  public onLogin() {
    this.authService.login('pepe-ponpin@gmail.com', '1234').subscribe( (user )=> {
    this.router.navigateByUrl('/');
    } );

  }

}
