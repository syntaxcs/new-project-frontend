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
  public checked = ''
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


  ) { }
  ngOnInit() {
    this.form = this.formBuilder.group({});
    this.drugservice.getDrug().subscribe(result => {
      this.drugs = result;
    });
    this.diseaseService.getDis().subscribe(result => {
      this.symptoms = result;
    });
  }
  onClose() {
    this.dialogRef.close(/*sent value to tab-supervision*/);
  }
  onSave() {
    const value = this.form.value;
    console.log(this.checked)
    // this.dialogRef.close(value);
  }


}
