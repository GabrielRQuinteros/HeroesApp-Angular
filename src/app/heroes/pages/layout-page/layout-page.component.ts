import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interfaces/user.interface';

@Component({
  selector: 'app-layout-page',
  standalone: false,

  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css'
})
export class LayoutPageComponent {

  constructor( private authService: AuthService,
               private router: Router,
   ){}

  public sidebarItems = [
                          { label: 'Listado', icon: 'label', url: './list' },
                          { label: 'Añadir', icon: 'add', url: './new-hero' },
                          { label: 'Buscar', icon: 'search', url: './search' },
                    ];


  get user(): User | undefined {
    return this.authService.currentUser;
  }

  public onLogout() {
      this.authService.logout();
      this.router.navigateByUrl("auth/login");
  }






}
