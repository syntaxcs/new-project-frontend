import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DrugService } from '../../../../shared/services/drug.service';
import { from } from 'rxjs/internal/observable/from';
@Component({
  selector: 'app-summary-dialog',
  templateUrl: './summary-dialog.component.html',
  //   styleUrls: ['./summary-dialog.component.css']
})
export class SummaryDialogComponent implements OnInit {
  public form: FormGroup;
  public drugs = [];
  select = null
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<SummaryDialogComponent>,
    private drugservice: DrugService,
  ) { }
  ngOnInit() {
    this.form = this.formBuilder.group({});
    this.drugservice.getDrug().subscribe(result => {
      this.drugs = result;
      console.log(this.drugs)
    })

  }
  onClose() {
    this.dialogRef.close(/*sent value to tab-supervision*/);
  }
  onSave() {
    const value = this.form.value;
    this.dialogRef.close(value);
  }
}
