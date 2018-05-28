import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { GlobalState } from '../../shared/global.state';
import { TreaterDialogComponent } from './treater-dialog/treater-dialog.component';
import { TreaterService } from '../../shared/services/treater.service';
import { ConfirmDeleteDialogComponent } from '../../theme/components/confirm-delete-dialog/confirm-delete-dialog.component';
@Component({
  selector: 'app-treater',
  templateUrl: './treater.component.html',
  styleUrls: ['./treater.component.scss']
})
export class TreaterComponent implements OnInit {
  public rows = [];
  public form: FormGroup;
  constructor(
    private _state: GlobalState,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private treaterService: TreaterService,
  ) { }

  ngOnInit() {
    this._state.notifyDataChanged('[Breadcrumbs] changed', [{ url: '/', title: 'หน้าแรก' }, { title: 'ผู้รักษา' }]);
    this.form = this.formBuilder.group({});
    this.treaterService.getCer().subscribe(result => {
      this.rows = result;
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(TreaterDialogComponent, {
      width: '750px',
      data: {
      }
    });
    dialogRef.afterClosed().subscribe(resultAllDialog => {
      if (resultAllDialog !== undefined) {
        this.treaterService.addCer(resultAllDialog)
          .mergeMap(() => this.treaterService.getCer())
          .subscribe((valueFromDatabse) => {
            this.rows = valueFromDatabse;
          })
      }
    });
  }
  openEditDialog(row): void {
    const dialogRef = this.dialog.open(TreaterDialogComponent, {
      width: '750px',
      data: {
        cerLicensed_No: row.cerLicensed_No,
        cerNameTitle: row.cerNameTitle,
        cerPhysicianName: row.cerPhysicianName,
        cerPhysicianSurName: row.cerPhysicianSurName
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.treaterService.updateCer(row._id, result)
          .mergeMap(() => this.treaterService.getCer())
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
        content: 'ใบอนุญาตประกอบโรคศิลปะเลขที่: ' + row.cerLicensed_No
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.status === true) {
        this.treaterService.deleteCer(row._id)
          .mergeMap(() => this.treaterService.getCer())
          .subscribe((results) => {
            this.rows = results;
          });
      }
    });
  }
}
