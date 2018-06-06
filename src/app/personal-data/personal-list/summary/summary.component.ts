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
  templateUrl: './summary.component.html',
  //  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  public rows = [];
  public id;

  constructor(
    private _state: GlobalState,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private activatedroute: ActivatedRoute,
    private summaryservice: SummaryService
  ) { this.id = this.activatedroute.snapshot.params['personalId']; }

  ngOnInit() {
    this.summaryservice.getSummary().subscribe(result => {
      this.rows = result;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SummaryDialogComponent, {
      width: '750px',
      height: '800px',
      data: {

      }
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
    return String(date).substr(0, 10)
  }
  openEditDialog(row): void {
    const dialogRef = this.dialog.open(SummaryDialogComponent, {
      width: '750px',
      height: '800px',
      data: {
        disease: row.disease,
        treatment: row.treatment,
        countDrugs: row.countDrugs,
        statusTime: row.statusTime,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.summaryservice.updateSummary(row._id, result)
          .mergeMap(() => this.summaryservice.getSummary())
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
          .mergeMap(() => this.summaryservice.getSummary())
          .subscribe((results) => {
            this.rows = results;
          });
      }
    });
  }
}
