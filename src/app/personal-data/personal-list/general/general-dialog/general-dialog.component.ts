import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-general-dialog',
  templateUrl: './general-dialog.component.html',
  styleUrls: ['./general-dialog.component.css']
})
export class GeneralDialogComponent implements OnInit {
  public form: FormGroup;
  date: Date;
  brithDay: Date;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<GeneralDialogComponent>,
  ) {
    if (this.data.date !== undefined) {
      this.date = new Date(this.data.date);
      this.date.setDate(this.date.getDate()-1);
    }
    if (this.data.time !== undefined) {
      this.brithDay = this.data.time
    }
  }
  ngOnInit() {
    this.form = this.formBuilder.group({});
  }
  onClose() {
    this.dialogRef.close(/*sent value to tab-supervision*/);
  }
  onSave() {
    const value = this.form.value;
    value.personId = this.data.personId
    value.date = this.date;
    value.date.setDate(this.date.getDate()+1);
    value.time = this.brithDay;
    this.dialogRef.close(value);
  }
}
