import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { GlobalState } from '../../shared/global.state';
import { RemedyDialogComponent } from './remedy-dialog/remedy-dialog.component';
import { TreatmentService } from '../../shared/services/treatment.service';
import { TreaterDialogComponent } from '../treater/treater-dialog/treater-dialog.component';
import { ConfirmDeleteDialogComponent } from '../../theme/components/confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-remedy',
  templateUrl: './remedy.component.html',
  styleUrls: ['./remedy.component.scss']
})
export class RemedyComponent implements OnInit {
  public rows = [];
  public form: FormGroup;
 
  constructor(
    private _state: GlobalState,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private treatmentService: TreatmentService,

  ) { }

  ngOnInit() {
    this._state.notifyDataChanged('[Breadcrumbs] changed', [{ url: '/', title: 'หน้าแรก' }, { title: 'วิธีการรักษา' }]);
    this.form = this.formBuilder.group({});
    this.treatmentService.getTreat().subscribe(result => {
      this.rows = result;
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(RemedyDialogComponent, {
      width: '750px',
      data: {
      }
    });

    dialogRef.afterClosed().subscribe(resultAllDialog => {
      if (resultAllDialog !== undefined) {
        this.treatmentService.addTreat(resultAllDialog)
        .mergeMap(() => this.treatmentService.getTreat())
        .subscribe((valueFromDatabse) => {
            this.rows = valueFromDatabse;
        })
      }
    });
  }
  openEditDialog(row): void {
    const dialogRef = this.dialog.open(RemedyDialogComponent, {
      width: '500px',
      data: {
        treatID: row.treatID,
        treatMents: row.treatMents,
        treatInTime: row.treatInTime,
        treatOutTime: row.treatOutTime
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.treatmentService.updateTreat(row._id, result)
          .mergeMap(() => this.treatmentService.getTreat())
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
        content: 'รหัสวิธีการรักษา: ' + row.treatID
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.status === true) {
        this.treatmentService.deleteTreat(row._id)
          .mergeMap(() => this.treatmentService.getTreat())
          .subscribe((results) => {
            this.rows = results;
          });
      }
    });
  }

}
