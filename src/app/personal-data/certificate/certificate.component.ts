import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { GlobalState } from '../../shared/global.state';
import { CertificateDialogComponent } from './certificate-dialog/certificate-dialog.component';
import { CertificateService } from '../../shared/services/certificate.service';
import { ConfirmDeleteDialogComponent } from '../../theme/components/confirm-delete-dialog/confirm-delete-dialog.component';
import { CertificateDetailDialogComponent } from './certificate-dialog-detail/certificate-dialog-detail.component';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import * as FileSaver from 'file-saver';
import 'rxjs/Rx';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent implements OnInit {
  public rows = [];
  public search = [];
  public id;
  public certificate = [];
  public form: FormGroup;


  constructor(
    private _state: GlobalState,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private certificateService: CertificateService,
    private router: Router,
    private http: HttpClient,

  ) { }

  ngOnInit() {
    this.certificateService.getCer().subscribe((result) => {
      this.rows = result;
      this.search = [...result];
    })
    this.certificateService.getCerPdfById(this.id).subscribe()
  }
  searchFilter(event) {
    const val = event.target.value;
    const temp = this.search.filter((data) => {
      return data.personal.personName.indexOf(val) !== -1 ||
        data.personal.personSurname.indexOf(val) !== -1 || !val;
    });
    this.rows = temp;
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(CertificateDialogComponent, {
      width: '750px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(resultAllDialog => {
      if (resultAllDialog !== undefined) {
        this.certificateService.addCer(resultAllDialog)
          .mergeMap(() => this.certificateService.getCer())
          .subscribe((valueFromDatabse) => {
            this.rows = valueFromDatabse;
            this.search = [...valueFromDatabse];
          })
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
    const dialogRef = this.dialog.open(CertificateDialogComponent, {
      width: '750px',
      data: {
        personal: row.personal,
        treater: row.treater._id,
        date: row.date,
        cerSymptom: row.cerSymptom,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.certificateService.updateCer(row._id, result)
          .mergeMap(() => this.certificateService.getCer())
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
        this.certificateService.deleteCer(row._id)
          .mergeMap(() => this.certificateService.getCer())
          .subscribe((results) => {
            this.rows = results;
            this.search = [...results];
          });
      }
    });
  }
  openDetailDialog(view): void {
    const dialogRef = this.dialog.open(CertificateDetailDialogComponent, {
      width: '750px',
      height: '700px',
      data: {
        personal: view.personal,
        treater: view.treater,
        date: view.date,
        cerSymptom: view.cerSymptom,
      }
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result !== undefined) {
        this.certificateService.createCerPdf(result)
          .subscribe(
          data => FileSaver.saveAs(data, 'ใบรับรองแพทย์' + '.pdf'),
          error => console.error(error)
          );
      }
    });
  }

}
