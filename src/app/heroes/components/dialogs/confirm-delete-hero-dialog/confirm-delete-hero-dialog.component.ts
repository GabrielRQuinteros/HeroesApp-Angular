import { Component, inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Hero } from '../../../interfaces/hero.interface';

@Component({
  selector: 'app-confirm-delete-hero-dialog',
  standalone: false,
  templateUrl: './confirm-delete-hero-dialog.component.html',
  styleUrl: './confirm-delete-hero-dialog.component.css'
})
export class ConfirmDeleteHeroDialogComponent {

  readonly dialogRef = inject(MatDialogRef<ConfirmDeleteHeroDialogComponent>);
  readonly hero = inject<Hero>(MAT_DIALOG_DATA);

  public onNoClick(): void {
    this.dialogRef.close(false);
  }

  public onConfirm(): void {
    this.dialogRef.close(true);
  }

}
