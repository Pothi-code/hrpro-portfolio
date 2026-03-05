import { Component } from '@angular/core';
import {MAT_DIALOG_DATA,MatDialogRef,MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Inject } from '@angular/core';
@Component({
  selector: 'app-confirm-dialog',
  imports: [MatDialogModule,MatButtonModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {
   constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close(result: boolean) {
    this.dialogRef.close(result);
  }

}
