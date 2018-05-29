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
  public drugCtrl: FormControl = new FormControl();
  /** control for the MatSelect filter keyword */
  public drugFilterCtrl: FormControl = new FormControl();
  /** control for the selected bank for multi-selection */
  public drugMultiCtrl: FormControl = new FormControl();
  /** control for the MatSelect filter keyword multi-selection */
  public drugMultiFilterCtrl: FormControl = new FormControl();
  /** list of banks filtered by search keyword */
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

    // set initial selection
    this.drugCtrl.setValue(this.drugs[10]);
    this.drugMultiCtrl.setValue([this.drugs[10], this.drugs[11], this.drugs[12]]);

    // load the initial bank list
    this.filteredDrugs.next(this.drugs.slice());
    this.filteredDrugsMulti.next(this.drugs.slice());
    // listen for search field value changes
    this.drugFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterDrugs();
      });
    this.drugMultiFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterDrugsMulti();
      });
  }
  ngAfterViewInit() {
    this.setInitialValue();



  }
  onClose() {
    this.dialogRef.close(/*sent value to tab-supervision*/);
  }
  onSave() {
    const value = this.form.value;
    this.dialogRef.close(value);
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
  private setInitialValue() {
    this.filteredDrugs
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.singleSelect.compareWith = (a: Drug, b: Drug) => a.id === b.id;
        this.multiSelect.compareWith = (a: Drug, b: Drug) => a.id === b.id;
      });
  }
  private filterDrugs() {
    if (!this.drugs) {
      return;
    }
    // get the search keyword
    let search = this.drugFilterCtrl.value;
    if (!search) {
      this.filteredDrugs.next(this.drugs.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredDrugs.next(
      this.drugs.filter(drug => drug.name.toLowerCase().indexOf(search) > -1)
    );
  }
  private filterDrugsMulti() {
    if (!this.drugs) {
      return;
    }
    // get the search keyword
    let search = this.drugMultiFilterCtrl.value;
    if (!search) {
      this.filteredDrugsMulti.next(this.drugs.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredDrugsMulti.next(
      this.drugs.filter(bank => bank.name.toLowerCase().indexOf(search) > -1)
    );
  }

}
