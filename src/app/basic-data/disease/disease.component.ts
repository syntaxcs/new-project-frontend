import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { GlobalState } from '../../shared/global.state';
import { DiseaseDialogComponent } from './disease-dialog/disease-dialog.component'
@Component({
  selector: 'app-disease',
  templateUrl: './disease.component.html',
  styleUrls: ['./disease.component.scss']
})
export class DiseaseComponent implements OnInit {
  public rows = [];
  constructor(
    private _state: GlobalState,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this._state.notifyDataChanged('[Breadcrumbs] changed', [{ url: '/', title: 'หน้าแรก' }, { title: 'โรค' }]);
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DiseaseDialogComponent, {
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
