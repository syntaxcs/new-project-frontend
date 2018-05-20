import { Component, OnInit, ViewEncapsulation, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirm-delete-dialog',
  templateUrl: './confirm-delete-dialog.component.html',
  styleUrls: ['./confirm-delete-dialog.component.scss']
})
export class ConfirmDeleteDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ConfirmDeleteDialogComponent>,
  ) { }

  ngOnInit() {
  }
  onClose() {
    this.dialogRef.close({ status: false });
  }
  onSave() {
    this.dialogRef.close({ status: true });
  }
}
