import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';
import { take, takeUntil } from 'rxjs/operators';
import { MatSelect, VERSION } from '@angular/material';
import { GlobalState } from '../../../shared/global.state';
import { ConfirmDeleteDialogComponent } from '../../../theme/components/confirm-delete-dialog/confirm-delete-dialog.component';
import { SummaryDialogComponent } from './summary-dialog/summary-dialog.component';
import { SummaryService } from '../../../shared/services/summary.service';

interface Drug {
  id: string;
  Drug: string;
}
@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  //   styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  public rows = [];
  public id;
  public Drug = [];

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
    private _state: GlobalState,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private activatedroute: ActivatedRoute,
    private summaryService: SummaryService,

  ) { }//this.id = this.activatedroute.snapshot.params['personalId'];  }

  ngOnInit() {
    this.summaryService.getSummary().subscribe(result => {
      this.rows = result;
    });
    // set initial selection
    this.drugCtrl.setValue(this.Drug[10]);
    this.drugMultiCtrl.setValue([this.Drug[10], this.Drug[11], this.Drug[12]]);

    // load the initial bank list
    this.filteredDrugs.next(this.Drug.slice());
    this.filteredDrugsMulti.next(this.Drug.slice());
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

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
  private setInitialValue() {
    this.filteredDrugs
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.singleSelect.compareWith = (a: Drug, b: Drug) =>a.id === b.id;
        this.multiSelect.compareWith = (a: Drug, b: Drug) => a.id === b.id;
      });
  }
  private filterDrugs() {
    if (!this.Drug) {
      return;
    }
    // get the search keyword
    let search = this.drugFilterCtrl.value;
    if (!search) {
      this.filteredDrugs.next(this.Drug.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredDrugs.next(
      this.Drug.filter(drug => drug.name.toLowerCase().indexOf(search) > -1)
    );
  }
  private filterDrugsMulti() {
    if (!this.Drug) {
      return;
    }
    // get the search keyword
    let search = this.drugMultiFilterCtrl.value;
    if (!search) {
      this.filteredDrugsMulti.next(this.Drug.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredDrugsMulti.next(
      this.Drug.filter(bank => bank.name.toLowerCase().indexOf(search) > -1)
    );
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(SummaryDialogComponent, {
      width: '750px',
      height: '800px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(resultAllDialog => {
      if (resultAllDialog !== undefined) {
        this.summaryService.addSummary(resultAllDialog)
          .mergeMap(() => this.summaryService.getSummary())
          .subscribe((valueFromDatabse) => {
            this.rows = valueFromDatabse;
          })
      }
    });
  }
  
  openEditDialog(row): void {
    const dialogRef = this.dialog.open(SummaryDialogComponent, {
      width: '500px',
      data: {
        summarySymptom: row.summarySymptom,
        summaryProcedure: row.summaryProcedure,
        summaryTreatment: row.summaryTreatment,
        summaryHerbalcompress: row.summaryHerbalcompress,
        summaryHerbalsteam: row.summaryHerbalsteam,
        summaryDrug: row.summaryDrug,
        summaryUnit: row.summaryUnit
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.summaryService.updateSummary(row._id, result)
          .mergeMap(() => this.summaryService.getSummary())
          .subscribe((results) => {
            this.rows = results;
          });
      }
    });
  }
  confirmDelete(row): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '500px',
      data: {
        content: 'รหัสยา: ' + row.disID
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.status === true) {
        this.summaryService.deleteSummary(row._id)
          .mergeMap(() => this.summaryService.getSummary())
          .subscribe((results) => {
            this.rows = results;
          });
      }
    });
  }

}
