import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-certificate-dialog',
  templateUrl: './certificate-dialog.component.html',
  
  styleUrls: ['./certificate-dialog.component.css']
})
export class CertificateDialogComponent implements OnInit {
  public form: FormGroup;
  
  constructor(
   
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CertificateDialogComponent>,
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
