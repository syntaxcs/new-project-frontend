import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DrugService } from '../../../../shared/services/drug.service';
import { SummaryService } from '../../../../shared/services/summary.service';
import { from } from 'rxjs/internal/observable/from';

@Component({
  selector: 'app-summary-dialog',
  templateUrl: './summary-dialog.component.html',
  styleUrls: ['./summary-dialog.component.css']

})
export class SummaryDialogComponent implements OnInit {
  public form: FormGroup;
  public drugs = [];
  public symptoms = [];
  select = null
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<SummaryDialogComponent>,
    private drugservice: DrugService,
    private summaryService: SummaryService,

  ) { }
  ngOnInit() {
    this.form = this.formBuilder.group({});
    this.drugservice.getDrug().subscribe(result => {
      this.drugs = result; 
     });
    
      this.summaryService.getSummary().subscribe(result => {
        this.symptoms = result;
      });
  

  }
  onClose() {
    this.dialogRef.close(/*sent value to tab-supervision*/);
  }
  onSave() {
    const value = this.form.value;
    this.dialogRef.close(value);
  }
}
