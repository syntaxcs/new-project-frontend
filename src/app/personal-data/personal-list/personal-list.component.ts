import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router'

import { PersonalDialogComponent } from '../personal/personal-dialog/personal-dialog.component';
import { PersonalService } from '../../shared/services/personal.service';
@Component({
  selector: 'app-personal-list',
  templateUrl: './personal-list.component.html',
  styleUrls: ['./personal-list.component.scss']
})
export class PersonalListComponent implements OnInit {
  public rows = {};
  public id;
  public nametitle = ['นาย', 'นาง', 'นางสาว'];
  public status = ['โสด ( Single )', 'แต่งงาน ( Married )', 'หม้าย ( Widowed )', 'หย่า ( Divorced )'
    , 'แยกกันอยู่ ( Separated )', 'นักบวช ( Monk )'];
  constructor(
    private dialog: MatDialog,
    private personalService: PersonalService,
    private activatedroute: ActivatedRoute,
  ) {
    this.id = this.activatedroute.snapshot.params['personalId'];
  }

  ngOnInit() {
    this.personalService.getPersonById(this.id).subscribe(result => {
      this.rows = result;
    })
  }
  dateShow(date) {
    return String(date).substr(0, 10)
  }
  ageCalculate(birth) {
    if (birth !== undefined) {
      let now = Number(new Date().getFullYear())+ 543;
      let cen = Number(String(birth).substr(0, 4));
      return (now - cen);
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
  openEditDialog(row): void {
    const dialogRef = this.dialog.open(PersonalDialogComponent, {
        width: '750px',
        data: {
          personId: row.personalId,
          personNameTitle: row.personNameTitle,
          personName: row.personName,
          personSurname: row.personSurname,
          personGender: row.personGender,
          personBirth: row.personBirth,
          personMaritalStatus: row.personMaritalStatus,
          personNationality: row.personNationality,
          personCitizenship: row.personCitizenship,
          personReligion: row.personReligion,
          personCareer: row.personCareer,
          personIdentityId: row.personIdentityId,
          personBirthPlace: row.personBirthPlace,
          personProvince: row.personProvince,
          personAddress: row.personAddress,
          personNumber: row.personNumber,
          personFamilyHistory: row.personFamilyHistory,
          personPersonalHistory: row.personPersonalHistory,
        }

    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.personalService.updatePerson(row._id, result)
          .mergeMap(() => this.personalService.getPerson())
          .subscribe((results) => {
            this.rows = results;
          });
      }
    });
  }

  submit() {

  }
}
