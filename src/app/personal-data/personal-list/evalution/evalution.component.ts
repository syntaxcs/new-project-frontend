import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { GlobalState } from '../../../shared/global.state';
import { ConfirmDeleteDialogComponent } from '../../../theme/components/confirm-delete-dialog/confirm-delete-dialog.component';
import { EvalutionDialogComponent } from './evalution-dialog/evalution-dialog.component';
import { EvalutionService } from '../../../shared/services/evalution.service';
@Component({
  selector: 'app-evalution',
  templateUrl: './evalution.component.html',
//   styleUrls: ['./evalution.component.scss']
})
export class EvalutionComponent implements OnInit {
  public rows = [];
  constructor(
    private _state: GlobalState,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private evalutionService: EvalutionService,

  ) { }

  ngOnInit() {
    this._state.notifyDataChanged('[Breadcrumbs] changed', [{ url: '/', title: 'หน้าแรก' }, { title: 'โรค-หัตถการ' }]);
    this.evalutionService.getEva().subscribe(result => {
      this.rows = result;
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(EvalutionDialogComponent, {
      width: '750px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(resultAllDialog => {
      if (resultAllDialog !== undefined) {
        this.evalutionService.addEva(resultAllDialog)
          .mergeMap(() => this.evalutionService.getEva())
          .subscribe((valueFromDatabse) => {
            this.rows = valueFromDatabse;
          })
      }
    });
  }
  openEditDialog(row): void {
    const dialogRef = this.dialog.open(EvalutionDialogComponent, {
        width: '750px',
        data: {
            evaDate: row.evaDate,
            evaAfter: row.evaAfter,
            evaBodyParth: row.evaBodyParth
        }
    });
    dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
          this.evalutionService.updateEva(row._id, result)
          .mergeMap(() => this.evalutionService.getEva())
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
        content: 'รหัสยา: ' + row.evaBodyParth
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.status === true) {
        this.evalutionService.deleteEva(row._id)
          .mergeMap(() => this.evalutionService.getEva())
          .subscribe((results) => {
            this.rows = results;
          });
      }
    });
  }

}
