import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-physical-dialog-detail',
  templateUrl: './physical-dialog-detail.component.html',
})
export class PhysicalDetailDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<PhysicalDetailDialogComponent>,
  ) { }
  ngOnInit() {
  }
  onClose() {
    this.dialogRef.close(/*sent value to tab-supervision*/);
  }
  
  onSave() {
    this.dialogRef.close();
  }
  calculateBMI(value) {
    return String((Number(value.phyWeight) / Math.pow(Number(value.phyHeight), 2)) * 10000).substr(0, 5);
  }
}
