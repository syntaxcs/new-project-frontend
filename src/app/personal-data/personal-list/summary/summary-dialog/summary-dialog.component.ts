import { Component, OnInit, Inject, OnDestroy, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DrugService } from '../../../../shared/services/drug.service';
import { DiseaseService } from '../../../../shared/services/disease.service';
import { from } from 'rxjs/internal/observable/from';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';
import { take, takeUntil } from 'rxjs/operators';
import { MatSelect, VERSION } from '@angular/material';
import { TreatmentService } from '../../../../shared/services/treatment.service'
interface Drug {
  id: string;
  Drug: string;
}

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
  public duration = ['ในเวลา', 'นอกเวลา'];
  public treat = [];
  treatMents = [];
  isChecked = true;
  public disprod = '';
  public filteredDrugs: ReplaySubject<Drug[]> = new ReplaySubject<Drug[]>(1);
  /** list of banks filtered by search keyword for multi-selection */
  public filteredDrugsMulti: ReplaySubject<Drug[]> = new ReplaySubject<Drug[]>(1);

  @ViewChild('singleSelect') singleSelect: MatSelect;
  @ViewChild('multiSelect') multiSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  private _onDestroy = new Subject<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<SummaryDialogComponent>,
    private drugservice: DrugService,
    private diseaseService: DiseaseService,
    private treatmentservice: TreatmentService

  ) { }
  ngOnInit() {
    this.form = this.formBuilder.group({});
    this.treatmentservice.getTreat().subscribe(result => {
      this.treat = result;
    })
  }
 
  
  toggle(check, data){
    if( check === true ) {
      this.treatMents.push(data)
    } else {
      const index: number = this.treatMents.indexOf(data);
      if (index !== -1) {
        this.treatMents.splice(index, 1);
      }
    }
  }
  check(data){
    this.form.value.disProcedure = data.disProcedure;
  }
  onClose() {
    this.dialogRef.close(/*sent value to tab-supervision*/);
  }
  onSave() {
    const value = this.form.value;
    value.disease = this.data.disease._id
    value.treatment = this.treatMents;
    value.personId = this.data.personId
    this.dialogRef.close(value);
  }


}
