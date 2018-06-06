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
  public search = [];
  public form: FormGroup;
  constructor(
    private _state: GlobalState,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private treaterService: TreaterService,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({});
    this.treaterService.getTre().subscribe(result => {
      this.rows = result;
      this.search = [...result];
    });
  }
  searchFilter(event) {
    const val = event.target.value;
      const temp = this.search.filter((data) => {
        return data.treLicensed_No.indexOf(val) !== -1 ||
          data.trePhysicianName.indexOf(val) !== -1 ||
          data.trePhysicianSurName.indexOf(val) !== -1 || !val;
      });
      this.rows = temp;
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(TreaterDialogComponent, {
      width: '750px',
      data: {
      }
    });
    dialogRef.afterClosed().subscribe(resultAllDialog => {
      if (resultAllDialog !== undefined) {
        this.treaterService.addTre(resultAllDialog)
          .mergeMap(() => this.treaterService.getTre())
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
        treLicensed_No: row.treLicensed_No,
        treNameTitle: row.treNameTitle,
        trePhysicianName: row.trePhysicianName,
        trePhysicianSurName: row.trePhysicianSurName
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.treaterService.updateTre(row._id, result)
          .mergeMap(() => this.treaterService.getTre())
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
        content:  'ข้อมูลที่ถูกลบจะไม่สามารถกู้คืนได้ !'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.status === true) {
        this.treaterService.deleteTre(row._id)
          .mergeMap(() => this.treaterService.getTre())
          .subscribe((results) => {
            this.rows = results;
          });
      }
    });
  }
}
