import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  standalone: false,
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent {

  public searchInput: FormControl = new FormControl('');
  public heroes: Hero[]=[];
  public selectedHero?: Hero;

  constructor( private heroService: HeroesService ){}

  public searchHero(): void {
    const name: string = this.searchInput.value as string | '';
    if( name == '' )
      this.heroes = [];
    else
      this.heroService.getHeroesSuggestionsByName(name)
                          .subscribe( heroes => this.heroes = heroes );
  }

  public onSelectedOption(evento: MatAutocompleteSelectedEvent): void {

    if( ! evento.option.value ) {
      this.selectedHero = undefined ;
      return;
    }

    const hero: Hero = evento.option.value as Hero;
    this.searchInput.setValue( hero.superhero);
    this.selectedHero = hero;
  }


}
