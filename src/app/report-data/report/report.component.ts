import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { SummaryService } from './../../shared/services/summary.service';
import { ReportDetailDialogComponent } from './report-dialog-detail/report-dialog-detail.component';
import { ReportDialogComponent } from './report-dialog/report-dialog.component';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
})
export class ReportComponent implements OnInit {
  public rows = [];
  public search = [];
  public id = [];

  constructor(
    private dialog: MatDialog,
    private summaryservice: SummaryService
  ) { }

  ngOnInit() {
    this.summaryservice.getSummary().subscribe(result => {
      this.rows = result;
      this.search = [...result];
    });
    this.summaryservice.getSummaryPdf().subscribe()
  }
  searchFilter(event) {
    const val = event.target.value;
    const temp = this.search.filter((data) => {
      return (this.dateSearch(data.date).indexOf(val) !== -1);
    });
    this.rows = temp;
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
  openDialog(): void {
    const dialogRef = this.dialog.open(ReportDialogComponent, {
      width: '500px',
    
      data: { personId: this.id }
    });
    dialogRef.afterClosed().subscribe(resultAllDialog => {
      if (resultAllDialog !== undefined) {

      }
    });
  }
  openDetailDialog(view): void {
    const dialogRef = this.dialog.open(ReportDetailDialogComponent, {
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
}
