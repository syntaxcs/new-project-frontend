import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: 'edit-profile-dialog.component.html',
  styleUrls: ['edit-profile-dialog.component.scss']
})
export class EditProfileDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  onCancleClick(): void {
    this.dialogRef.close();
  }
}
