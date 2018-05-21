import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {Observable} from 'rxjs/Rx';
import { GlobalState } from '../../shared/global.state';
import { DrugDialogComponent } from './drug-dialog/drug-dialog.component';
import { DrugService } from '../../shared/services/drug.service';
@Component({
  selector: 'app-drug',
  templateUrl: './drug.component.html',
  styleUrls: ['./drug.component.scss']
})
export class DrugComponent implements OnInit {
  public rows = [];
  public form: FormGroup;
  constructor(
    private _state: GlobalState,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private drugService: DrugService,
  ) { }

  ngOnInit() {
    this._state.notifyDataChanged('[Breadcrumbs] changed', [{ url: '/', title: 'หน้าแรก' }, { title: 'ผู้รักษา' }]);
    this.form = this.formBuilder.group({});
    this.drugService.getDrug().subscribe(result => {
      this.rows = result;
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DrugDialogComponent, {
      width: '750px',
      data: {
      }
    });
    dialogRef.afterClosed().subscribe(resultAllDialog => {
      if (resultAllDialog !== undefined) {
        this.drugService.addDrug(resultAllDialog)
        .mergeMap(() => this.drugService.getDrug())
        .subscribe((valueFromDatabse) => {
            this.rows = valueFromDatabse;
        })
      }
    });
  }
}
