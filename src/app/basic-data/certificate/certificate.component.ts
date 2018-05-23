import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {Observable} from 'rxjs/Rx';
import { GlobalState } from '../../shared/global.state';
import { CertificateDialogComponent } from './certificate-dialog/certificate-dialog.component';
import { CertificateService} from '../../shared/services/certificate.service';
@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent implements OnInit {
  public rows = [];
  public form: FormGroup;
 
  constructor(
    private _state: GlobalState,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private certificateService: CertificateService,

  ) { }

  ngOnInit() {
    this._state.notifyDataChanged('[Breadcrumbs] changed', [{ url: '/', title: 'หน้าแรก' }, { title: 'ใบรับรองแพทย์' }]);
    this.form = this.formBuilder.group({});
    this.certificateService.getCer().subscribe(result => {
      this.rows = result;
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(CertificateDialogComponent, {
      width: '750px',
      data: {
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
