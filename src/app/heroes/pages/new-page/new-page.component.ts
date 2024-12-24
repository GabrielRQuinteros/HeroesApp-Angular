import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, switchMap } from 'rxjs';

import { ConfirmDeleteHeroDialogComponent } from '../../components/dialogs/confirm-delete-hero-dialog/confirm-delete-hero-dialog.component';
import { Hero, Publisher } from './../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-new-page',
  standalone: false,
  templateUrl: './new-page.component.html',
  styleUrl: './new-page.component.css'
})
export class NewPageComponent implements OnInit{

  constructor( private heroService: HeroesService,
               private activatedRoute: ActivatedRoute,
               private router: Router,
               private snackBar: MatSnackBar,
               private dialog: MatDialog,
   ){}


  public ngOnInit(): void {
      if( ! this.router.url.includes('edit') ) return;

      this.activatedRoute.params.pipe(
                                        switchMap( ( {id} ) => this.heroService.getHeroById(id) )
                                )
                                .subscribe( hero => {
                                    if( !hero ) return this.router.navigateByUrl('/');

                                    this.formHero.reset( hero );  /// RESETEA LOS VALORES DEL FORMULARIO A LOS QUE COINCIDAN CON LOS DEL OBJETO hero
                                    return;
                                  } )


  }


  public publishers: Publisher[] = [ Publisher.DCComics, Publisher.MarvelComics ];

  public formHero: FormGroup = new FormGroup(
    {
      id: new FormControl<string>(''),
      superhero: new FormControl<string>('', { nonNullable: true }),
      publisher: new FormControl<Publisher>(Publisher.DCComics),
      alter_ego: new FormControl<string>(''),
      first_appearance: new FormControl<string>(''),
      characters: new FormControl(''),
      alt_image: new FormControl(''),
    }
  );


  get currentHero(): Hero {
    const hero= this.formHero.value;
    return hero as Hero;
  }

  public onSubmit() {

    if( this.formHero.invalid ) return;

    if( this.currentHero.id )
        this.heroService.updateHero( this.currentHero ).subscribe( hero =>{
          this.showSnackBar( `${ hero.superhero } updated.`  );
        } );
    else
        this.heroService.addHero( this.currentHero ).subscribe( hero => {
          this.router.navigate(['/heroes/edit', hero.id])
          this.showSnackBar( `${ hero.superhero } created.`  );
        });


  }

  public onDeleteHero() {
      if( !this.currentHero?.id ) throw new Error('A hero id is required');

      const dialogRef = this.dialog
                            .open(ConfirmDeleteHeroDialogComponent, {
                                                                      data: this.formHero.value,
                                                                    }
                                  );

      dialogRef.afterClosed()
                .pipe(
                        filter( result => result ),
                        switchMap( () => this.heroService.deleteHero( this.currentHero.id ) ),
                        filter(wasDeleted => wasDeleted),
                )
                .subscribe( ()=> this.router.navigateByUrl("/heroes/list") );
  }


  public showSnackBar( message: string ): void {
      this.snackBar.open( message, 'done', { duration: 2500 } );
  }


}
