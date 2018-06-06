import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
// import { CertificateService } from '../../../shared/services/certificate.service';
import { TreaterService } from '../../../shared/services/treater.service';
@Component({
  selector: 'app-certificate-dialog',
  templateUrl: './certificate-dialog.component.html',
  styleUrls: ['./certificate-dialog.component.css']
})
export class CertificateDialogComponent implements OnInit {
  public form: FormGroup;
  public certificate = [];
  select = null
  date: Date;
  startDate: any;
  brithDay: Date;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CertificateDialogComponent>,
    private treaterService: TreaterService,
  ) {
    let year = new Date().getFullYear() + 543;
    let month = new Date().getMonth()
    this.startDate = new Date(year, month + 1, null, null, null, null);
  }
  ngOnInit() {
    this.form = this.formBuilder.group({});
    this.treaterService.getTre().subscribe(result => {
      this.certificate = result;
    })


  }
  onClose() {
    this.dialogRef.close(/*sent value to tab-supervision*/);
  }
  onSave() {
    const value = this.form.value;
    value.cerDateout = this.date;
    this.dialogRef.close(value);
  }
}
