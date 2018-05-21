import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-treater-dialog',
  templateUrl: './treater-dialog.component.html',
  styleUrls: ['./treater-dialog.component.css']
})
export class TreaterDialogComponent implements OnInit {
  public form: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<TreaterDialogComponent>,
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
