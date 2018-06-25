import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'
import { GlobalState } from '../../../shared/global.state';
import { ConfirmDeleteDialogComponent } from '../../../theme/components/confirm-delete-dialog/confirm-delete-dialog.component';
import { SummaryDialogComponent } from './summary-dialog/summary-dialog.component';
import { SummaryDetailDialogComponent} from './summary-dialog-detail/summary-dialog-detail.component';
import { SummaryService } from './../../../shared/services/summary.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html'
})
export class SummaryComponent implements OnInit {
  public rows = [];
  public search = [];
  public id;

  constructor(
    private _state: GlobalState,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private activatedroute: ActivatedRoute,
    private summaryservice: SummaryService
  ) { this.id = this.activatedroute.snapshot.params['personalId']; }

  ngOnInit() {
    this.summaryservice.getSummaryById(this.id).subscribe(result => {
      this.rows = result;
      this.search = [...result];
      console.log(this.rows)
    });
    this.summaryservice.getSummaryPdfById(this.id).subscribe()
  }
  searchFilter(event) {
    const val = event.target.value;
    const temp = this.search.filter((data) => {
      return (this.dateSearch(data.date).indexOf(val) !== -1);
    });
    this.rows = temp;
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(SummaryDialogComponent, {
      width: '750px',
      height: '800px',
      data: { personId: this.id }
    });
    dialogRef.afterClosed().subscribe(resultAllDialog => {
      if (resultAllDialog !== undefined) {
        this.summaryservice.addSummary(resultAllDialog)
          .mergeMap(() => this.summaryservice.getSummaryById(this.id))
          .subscribe((results) => {
            this.rows = results;
            this.search = [...results];
          });
      }
    });
  }
  dateShow(date) {
    let year = String(Number(String(date).substr(0, 4)) + 543);
    let month = String(date).substr(5, 2);
    let day = String(date).substr(8, 2);
    return day + '/' + month + '/' + year;
  }
  dateSearch(date) {
    let year = String(Number(String(date).substr(0, 4)) + 543);
    let month = String(date).substr(5, 2);
    return month + '/' + year;
  }
  openDetailDialog(view): void {
    const dialogRef = this.dialog.open(SummaryDetailDialogComponent, {
      width: '750px',
      data: {
        personId: this.id,
        date: this.dateShow(view.date),
        time: view.time,
        disease: view.disease,
        treatment: view.treatment,
        treater: view.treater._id,
        officer: view.officer._id,
        countDrugs: view.countDrugs,
        statusTime: view.statusTime,
      }
    });
  }
  openEditDialog(row): void {
    const dialogRef = this.dialog.open(SummaryDialogComponent, {
      width: '750px',
      height: '800px',
      data: {
        personId: this.id,
        date: row.date,
        time: row.time,
        disease: row.disease,
        treatment: row.treatment,
        treater: row.treater._id,
        officer: row.officer._id,
        countDrugs: row.countDrugs,
        statusTime: row.statusTime,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.summaryservice.updateSummary(row._id, result)
          .mergeMap(() => this.summaryservice.getSummaryById(this.id))
          .subscribe((results) => {
            this.rows = results;
            this.search = [...results];
          });
      }
    });
  }
  confirmDelete(row): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '500px',
      data: {
        content: 'ข้อมูลที่ถูกลบจะไม่สามารถกู้คืนได้ !'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.status === true) {
        this.summaryservice.deleteSummary(row._id)
          .mergeMap(() => this.summaryservice.getSummaryById(this.id))
          .subscribe((results) => {
            this.rows = results;
            this.search = [...results];
          });
      }
    });
  }
}
