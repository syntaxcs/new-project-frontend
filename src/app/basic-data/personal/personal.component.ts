import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {Observable} from 'rxjs/Rx';
import { GlobalState } from '../../shared/global.state';
import { PersonalDialogComponent } from './personal-dialog/personal-dialog.component';
import { PersonalService } from '../../shared/services/personal.service';
@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {
  public rows = [];
  public form: FormGroup;
  constructor(
    private _state: GlobalState,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private personalService: PersonalService,

  ) { }

  ngOnInit() {
    this._state.notifyDataChanged('[Breadcrumbs] changed', [{ url: '/', title: 'หน้าแรก' }, { title: 'เข้าสู่ระบบ' }]);
    this.form = this.formBuilder.group({});
    this.personalService .getPerson().subscribe(result => {
      this.rows = result;
    });
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(PersonalDialogComponent, {
      width: '750px',
      data: {
      }
    });

    dialogRef.afterClosed().subscribe(resultAllDialog => {
      if (resultAllDialog !== undefined) {
        this.personalService .addPerson(resultAllDialog)
        .mergeMap(() => this.personalService .getPerson())
        .subscribe((valueFromDatabse) => {
            this.rows = valueFromDatabse;
        })
      }
    });
  }
  

}
