import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { GlobalState } from '../../shared/global.state';
import { CertificateDialogComponent } from './certificate-dialog/certificate-dialog.component';
import { CertificateService } from '../../shared/services/certificate.service';
import { ConfirmDeleteDialogComponent } from '../../theme/components/confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent implements OnInit {
  public rows = [];
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
    })
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
    return String(date).substr(0, 10)
  }
  openEditDialog(row): void {
    const dialogRef = this.dialog.open(CertificateDialogComponent, {
      width: '750px',
      data: {
        
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

}
