import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { GlobalState } from '../../shared/global.state';
import { TreaterDialogComponent } from './treater-dialog/treater-dialog.component'
@Component({
  selector: 'app-treater',
  templateUrl: './treater.component.html',
  styleUrls: ['./treater.component.scss']
})
export class TreaterComponent implements OnInit {
  public rows = [];
  constructor(
    private _state: GlobalState,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this._state.notifyDataChanged('[Breadcrumbs] changed', [{ url: '/', title: 'หน้าแรก' }, { title: 'ผู้รักษา' }]);
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(TreaterDialogComponent, {
      width: '750px',
      data: {
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {

      }
    });
  }
}
