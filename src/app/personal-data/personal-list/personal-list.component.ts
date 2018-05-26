import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { GlobalState } from '../../shared/global.state';
// import { PhysicalDialogComponent} from './physical/physical-dialog/physical-dialog.component';
import { PersonalService } from '../../shared/services/personal.service';
@Component({
  selector: 'app-personal-list',
  templateUrl: './personal-list.component.html',
  //   styleUrls: ['./disease.component.scss']
})
export class PersonalListComponent implements OnInit {
  public rows = [];
  public form: FormGroup;
  public id;

  constructor(
    private _state: GlobalState,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private personalService: PersonalService,

  ) { }

  ngOnInit() {
    this._state.notifyDataChanged('[Breadcrumbs] changed', [{ url: '/', title: 'หน้าแรก' }, { title: 'โรค-หัตถการ' }]);
    this.form = this.formBuilder.group({});
    this.personalService.getPerson().subscribe(result => {
      this.rows = result;
    });
  }
  submit() {
    const value = this.form.value;
    if (value !== undefined) {
      if (this.form.value.status === 'edit') {
        console.log(value)
        this.personalService.updatePerson(value.id, value)
          .mergeMap(() => this.personalService.getPersonById(this.id))
          .subscribe(result => {
            this.rows = result;
          })
      } else {
        this.personalService.addPerson(value)
          .mergeMap(() => this.personalService.getPersonById(this.id))
          .subscribe(result => {
            this.rows = result;
          })
      }
    }
  }
}
