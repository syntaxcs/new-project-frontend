import { Component, OnInit, Inject, OnDestroy, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-summary-dialog-detail',
  templateUrl: './summary-dialog-detail.component.html',
})
export class SummaryDetailDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SummaryDetailDialogComponent>,
  ) { 
  }
  ngOnInit() {
  }
  onClose() {
    this.dialogRef.close(/*sent value to tab-supervision*/);
  }
  onSave() {
    this.dialogRef.close();
  }


}
