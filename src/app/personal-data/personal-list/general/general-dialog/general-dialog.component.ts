import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-general-dialog',
  templateUrl: './general-dialog.component.html',
//   styleUrls: ['./general-dialog.component.css']
})
export class GeneralDialogComponent implements OnInit {
  public form: FormGroup;
  startDate: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<GeneralDialogComponent>,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({});
    this.calculateYear();
  }
  calculateYear() {
    let year = new Date().getFullYear() + 543;
    let month = new Date().getMonth()
    this.startDate = new Date(year+1, month+1, null, null, null, null);
  }
  onClose() {
    this.dialogRef.close(/*sent value to tab-supervision*/);
  }
  onSave() {
    const value = this.form.value;
    this.dialogRef.close(value);
  }
}
