import { Component, OnInit, NgModule } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { GlobalState } from '../../../shared/global.state';
import { ConfirmDeleteDialogComponent } from '../../../theme/components/confirm-delete-dialog/confirm-delete-dialog.component';
import { GeneralDialogComponent } from './general-dialog/general-dialog.component';
import { GeneralService} from '../../../shared/services/general.service';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';


@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {
  public rows = [];
  constructor(
    private _state: GlobalState,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private generalService:GeneralService,

  ) { }

  ngOnInit() {
    this._state.notifyDataChanged('[Breadcrumbs] changed', [{ url: '/', title: 'หน้าแรก' }, { title: 'โรค-หัตถการ' }]);
    this.generalService.getGen().subscribe(result => {
      this.rows = result;
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(GeneralDialogComponent, {
      width: '750px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(resultAllDialog => {
      if (resultAllDialog !== undefined) {
        this.generalService.addGen(resultAllDialog)
          .mergeMap(() => this.generalService.getGen())
          .subscribe((valueFromDatabse) => {
            this.rows = valueFromDatabse;
          })
      }
    });
  }
  openEditDialog(row): void {
    const dialogRef = this.dialog.open(GeneralDialogComponent, {
        width: '500px',
        data: {
          disID: row.disID,
          disName: row.disName,
          disProcedure: row.disProcedure
        }
    });
    dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
          this.generalService.updateGen(row._id, result)
          .mergeMap(() => this.generalService.getGen())
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
        content: 'รหัสยา: ' + row.disID
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.status === true) {
        this.generalService.deleteGen(row._id)
          .mergeMap(() => this.generalService.getGen())
          .subscribe((results) => {
            this.rows = results;
          });
      }
    });
  }

}
