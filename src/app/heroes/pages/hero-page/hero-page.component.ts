import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';

@Component({
  selector: 'app-hero-page',
  standalone: false,

  templateUrl: './hero-page.component.html',
  styleUrl: './hero-page.component.css'
})
export class HeroPageComponent implements OnInit{


  public hero?: Hero;

  constructor(
    private heroesService: HeroesService,
    private activeRoute: ActivatedRoute,
    private router: Router ){}



  ngOnInit(): void {
    this.activeRoute.params
                    .pipe(
                      switchMap( ( {id} ) => this.heroesService.getHeroById(id) )
                    )
                    .subscribe( hero => {

                      if( ! hero )
                        return this.router.navigateByUrl('/404');

                      return this.hero = hero;

                    } );
  }

}
