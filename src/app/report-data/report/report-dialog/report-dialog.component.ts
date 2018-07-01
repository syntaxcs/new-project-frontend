import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-report-dialog',
  templateUrl: './report-dialog.component.html'
})
export class ReportDialogComponent implements OnInit {
  public form: FormGroup;
  public month = ['มกราคม' , 'กุมพาพันธ์' , 'มีนาคม' , 'เมษายน' , 'พฤษภาคม' , 'มิถุนายน' , 'กรกฎาคม' ,
'สิงหาคม' , 'กันยายน' , 'ตุลาคม' , 'พฤศจิกายน' , 'ธันวาคม'];
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ReportDialogComponent>,
  ) { }
  ngOnInit() {
    this.form = this.formBuilder.group({});
  }
  onClose() {
    this.dialogRef.close(/*sent value to tab-supervision*/);
  }
  onSave() {
    const value = this.form.value;
    this.dialogRef.close(value);
  }
}
