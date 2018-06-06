import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { GlobalState } from '../../shared/global.state';
import { ConfirmDeleteDialogComponent } from '../../theme/components/confirm-delete-dialog/confirm-delete-dialog.component';
import { DiseaseDialogComponent } from './disease-dialog/disease-dialog.component';
import { DiseaseService } from '../../shared/services/disease.service';
@Component({
  selector: 'app-disease',
  templateUrl: './disease.component.html',
  styleUrls: ['./disease.component.scss']
})
export class DiseaseComponent implements OnInit {
  public rows = [];
  public search = [];
  constructor(
    private _state: GlobalState,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private diseaseService: DiseaseService,

  ) { }

  ngOnInit() {
    this.diseaseService.getDis().subscribe(result => {
      this.rows = result;
      this.search = [...result];
    });
  }
  searchFilter(event) {
    const val = event.target.value;
      const temp = this.search.filter((data) => {
        return data.disID.indexOf(val) !== -1 ||
          data.disName.indexOf(val) !== -1 ||
          data.disProcedure.indexOf(val) !== -1 || !val;
      });
      this.rows = temp;
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DiseaseDialogComponent, {
      width: '750px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(resultAllDialog => {
      if (resultAllDialog !== undefined) {
        this.diseaseService.addDis(resultAllDialog)
          .mergeMap(() => this.diseaseService.getDis())
          .subscribe((valueFromDatabse) => {
            this.rows = valueFromDatabse;
          })
      }
    });
  }
  openEditDialog(row): void {
    const dialogRef = this.dialog.open(DiseaseDialogComponent, {
      width: '750px',
      data: {
        disID: row.disID,
        disName: row.disName,
        disProcedure: row.disProcedure
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.diseaseService.updateDis(row._id, result)
          .mergeMap(() => this.diseaseService.getDis())
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
        this.diseaseService.deleteDis(row._id)
          .mergeMap(() => this.diseaseService.getDis())
          .subscribe((results) => {
            this.rows = results;
          });
      }
    });
  }

}
