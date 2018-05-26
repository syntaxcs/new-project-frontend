import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { GlobalState } from '../../shared/global.state';
import { Router } from '@angular/router';
import { PersonalDialogComponent } from './personal-dialog/personal-dialog.component';
import { PersonalService } from '../../shared/services/personal.service';
@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {
  public rows = [];
  public nametitle = ['นาย', 'นาง', 'นางสาว'];
  public status = ['โสด ( Single )', 'แต่งงาน ( Married )', 'หม้าย ( Widowed )', 'หย่า ( Divorced )'
    , 'แยกกันอยู่ ( Separated )', 'นักบวช ( Monk )'];
  constructor(
    private _state: GlobalState,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private personalService: PersonalService,
    private router: Router,
  ) { }

  ngOnInit() {
    this._state.notifyDataChanged('[Breadcrumbs] changed', [{ url: '/', title: 'หน้าแรก' }, { title: 'เข้าสู่ระบบ' }]);
    this.personalService.getPerson().subscribe(result => {
      this.rows = result;
    });
  }

  findPerson(userPerson) {
    if (userPerson !== '' || userPerson !== undefined) {
      this.rows.forEach(element => {
        if (element.personId === userPerson) {
          this.router.navigate(['personal-data/personal/personal-list', element._id]);
        }
      })
    }
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(PersonalDialogComponent, {
      width: '750px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(resultAllDialog => {
      if (resultAllDialog !== undefined) {
        this.personalService.addPerson(resultAllDialog)
          .mergeMap(() => this.personalService.getPerson())
          .subscribe((valueFromDatabse) => {
            this.rows = valueFromDatabse;
          })
      }
    });
  }
}
