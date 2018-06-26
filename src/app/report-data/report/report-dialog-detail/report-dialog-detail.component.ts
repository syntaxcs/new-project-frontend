import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-report-dialog-detail',
  templateUrl: './report-dialog-detail.component.html',
})
export class ReportDetailDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ReportDetailDialogComponent>,
  ) { }
  ngOnInit() {
  }
  onClose() {
    this.dialogRef.close(/*sent value to tab-supervision*/);
  }
  onSave() {
    this.dialogRef.close();
  }


}
