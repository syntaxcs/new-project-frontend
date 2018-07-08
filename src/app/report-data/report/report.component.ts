import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { SummaryService } from './../../shared/services/summary.service';
import { ReportDetailDialogComponent } from './report-dialog-detail/report-dialog-detail.component';
import { ReportDialogComponent } from './report-dialog/report-dialog.component';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import * as FileSaver from 'file-saver';
import 'rxjs/Rx';
import { async } from '@angular/core/testing';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
})
export class ReportComponent implements OnInit {
  public rows = [];
  public search = [];
  public id = [];
  public pdfSrc = "";
  constructor(
    private dialog: MatDialog,
    private summaryservice: SummaryService,
    private router: Router,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.summaryservice.getSummary().subscribe(result => {
      this.rows = result;
      this.search = [...result];
    });
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
    });
    dialogRef.afterClosed().subscribe(async result => {
      if (result !== undefined) {
        let date = this.convertDate(result)
        this.summaryservice.createSummaryPdf(result)
          .mergeMap(() => this.downloadFile(date)).subscribe(
          data => FileSaver.saveAs(data, 'สรุปผู้ป่วย ' + date),
          error => console.error(error)
          );
      }
    });
  }
  convertDate(date) {
    return String(date.year - 543) + '-' + String(this.convertMonth(date.month));
  }
  convertMonth = (month) => {
    switch (month) {
      case "มกราคม": return "01"
      case "กุมพาพันธ์": return "02"
      case "มีนาคม": return "03"
      case "เมษายน": return "04"
      case "พฤษภาคม": return "05"
      case "มิถุนายน": return "06"
      case "กรกฎาคม": return "07"
      case "สิงหาคม": return "08"
      case "กันยายน": return "09"
      case "ตุลาคม": return "10"
      case "พฤศจิกายน": return "11"
      case "ธันวาคม": return "12"
      default: return "0"
    }
  }
  downloadFile(name: String) {
    return this.http.get('http://localhost:3000/summary/getpdf/' + name, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  openDetailDialog(view): void {
    const dialogRef = this.dialog.open(ReportDetailDialogComponent, {
      width: '750px',
      height: '500px',

      data: {
        personId: view.personId,
        date: this.dateShow(view.date),
        time: view.time,
        disease: view.disease,
        treatment: view.treatment,
        treater: view.treater,
        officer: view.officer,
        countDrugs: view.countDrugs,
        statusTime: view.statusTime,

      }

    });
  }
}
