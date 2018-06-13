import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'
import { GlobalState } from '../../../shared/global.state';
import { ConfirmDeleteDialogComponent } from '../../../theme/components/confirm-delete-dialog/confirm-delete-dialog.component';
import { SummaryDialogComponent } from './summary-dialog/summary-dialog.component';
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
    });
  }
  searchFilter(event) {
    const val = event.target.value;
    const temp = this.search.filter((data) => {
      return (this.dateShow(data.date).indexOf(val) !== -1);
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
  openEditDialog(row): void {
    const dialogRef = this.dialog.open(SummaryDialogComponent, {
      width: '750px',
      height: '800px',
      data: {
        date: row.date,
        time: row.time,
        disease: row.disease,
        treatment: row.treatment,
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
          });
      }
    });
  }
}
