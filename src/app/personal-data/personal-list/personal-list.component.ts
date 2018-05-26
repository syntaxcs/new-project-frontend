import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'
import { GlobalState } from '../../shared/global.state';
// import { PhysicalDialogComponent} from './physical/physical-dialog/physical-dialog.component';
import { PersonalService } from '../../shared/services/personal.service';
@Component({
  selector: 'app-personal-list',
  templateUrl: './personal-list.component.html',
    styleUrls: ['./personal-list.component.scss']
})
export class PersonalListComponent implements OnInit {
  public rows = [];
  public id;
  constructor(
    private _state: GlobalState,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private personalService: PersonalService,
    private activatedroute: ActivatedRoute,
  ) { 
    this.id = this.activatedroute.snapshot.params['personalId'];
  }

  ngOnInit() {
    this._state.notifyDataChanged('[Breadcrumbs] changed', [{ url: '/', title: 'หน้าแรก' }, { title: 'โรค-หัตถการ' }]);
    this.personalService.getPersonById(this.id).subscribe(result => {
      this.rows = result;
  })
  }
  submit() {

  }
}
