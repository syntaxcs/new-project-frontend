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
  // openDialog(): void {
  //   const dialogRef = this.dialog.open(, {
  //     width: '750px',
  //     data: {
  //     }
  //   });

  //   dialogRef.afterClosed().subscribe(resultAllDialog => {
  //     if (resultAllDialog !== undefined) {
  //       this.personalService.addPerson(resultAllDialog)
  //         .mergeMap(() => this.personalService.getPerson())
  //         .subscribe((valueFromDatabse) => {
  //           this.rows = valueFromDatabse;
  //         })
  //     }
  //   });
  // }


}
