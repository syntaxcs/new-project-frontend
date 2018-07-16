import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
// import { CertificateService } from '../../../shared/services/certificate.service';
import { TreaterService } from '../../../shared/services/treater.service';

@Component({
  selector: 'app-certificate-dialog-detail',
  templateUrl: './certificate-dialog-detail.component.html',
//   styleUrls: ['./certificate-dialog.component.css']
})
export class CertificateDetailDialogComponent implements OnInit {
  public form: FormGroup;
  public certificate = [];
  select = null
  date: Date;
  startDate: any;
  brithDay: Date;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CertificateDetailDialogComponent>,
    private treaterService: TreaterService,
    
  ) {
    let year = new Date().getFullYear() + 543;
    let month = new Date().getMonth()
    this.startDate = new Date(year, month + 1, null, null, null, null);
  }
  ngOnInit() {
    this.date = new Date();
    this.form = this.formBuilder.group({});
  }
  onClose() {
    this.dialogRef.close(/*sent value to tab-supervision*/);
  }
  onSave() {
    const value = this.form.value;
    value.personal = this.data.personal
    value.date = this.date;
    value.date.setDate(this.date.getDate() + 1);
    value.treater = this.data.treater
    value.cerSymptom = this.data.cerSymptom,
    this.dialogRef.close(value);
  }
  dateShow(date) {
    let year = String(Number(String(date).substr(0, 4)) + 543);
    let month = String(date).substr(5, 2);
    let day = String(date).substr(8, 2);
    return day + '/' + month + '/' + year;
  }
}
