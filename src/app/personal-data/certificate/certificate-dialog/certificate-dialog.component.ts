import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TreaterService } from '../../../shared/services/treater.service';
import { from } from 'rxjs/internal/observable/from';

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
  brithDay: Date;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CertificateDialogComponent>,
    private treaterService: TreaterService,
    
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
    this.treaterService.getTre().subscribe(result => {
      this.certificate = result;
    })
  }
  onClose() {
    this.dialogRef.close(/*sent value to tab-supervision*/);
  }
  onSave() {
    const value = this.form.value;
    value.date = this.date;
    value.date.setDate(this.date.getDate()+1);
    value.personal = this.data.personal._id;
    this.dialogRef.close(value);
  }
}
