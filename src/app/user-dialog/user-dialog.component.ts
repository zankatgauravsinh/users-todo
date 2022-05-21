import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent  {
  user:any = {address:{street:''}};
  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      if (data) {
        this.user = data
      }
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() :void {
    this.dialogRef.close({action:this.user.id?'edit':'add', data:this.user});
  }

}
