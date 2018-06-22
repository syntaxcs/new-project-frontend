import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { GlobalState } from '../../shared/global.state';
import { CertificateDialogComponent } from './certificate-dialog/certificate-dialog.component';
import { CertificateService } from '../../shared/services/certificate.service';
import { ConfirmDeleteDialogComponent } from '../../theme/components/confirm-delete-dialog/confirm-delete-dialog.component';
import { CertificateDetailDialogComponent } from './certificate-dialog-detail/certificate-dialog-detail.component';

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
  

  ) { 
    
  }

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
      return (this.dateShow(data.date).indexOf(val) !== -1);
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
        cerDateout: row.cerDateout,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.certificateService.updateCer(row._id, result)
          .mergeMap(() => this.certificateService.getCer())
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
        this.certificateService.deleteCer(row._id)
          .mergeMap(() => this.certificateService.getCer())
          .subscribe((results) => {
            this.rows = results;
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
        personNameTitle: view.personNameTitle,
        personName: view.personName,
        personSurname: view.personSurname,
        treater: view.treater,
        date: view.date,
        cerSymptom: view.cerSymptom,
        cerDateout: view.cerDateout,

      }
    });

    dialogRef.afterClosed().subscribe(resultAllDialog => {
      if (resultAllDialog !== undefined) {
        this.certificateService.addCer(resultAllDialog)
          .mergeMap(() => this.certificateService.getCer())
          .subscribe((valueFromDatabse) => {
            this.rows = valueFromDatabse;
          })
      }
    });
  }

}
