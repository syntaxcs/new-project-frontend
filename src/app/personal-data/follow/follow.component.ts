import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { GlobalState } from '../../shared/global.state';
import { FollowDialogComponent } from './follow-dialog/follow-dialog.component';
import { FollowService } from '../../shared/services/follow.service';
import { ConfirmDeleteDialogComponent } from '../../theme/components/confirm-delete-dialog/confirm-delete-dialog.component';
import { FollowDetailDialogComponent } from './follow-dialog-detail/follow-dialog-detail.component';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.scss']
})
export class FollowComponent implements OnInit {
  public rows = [];
  public search = [];
  public id;
  public form: FormGroup;
  constructor(
    private _state: GlobalState,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private followService: FollowService,

  ) { }

  ngOnInit() {
    this.followService.getFollow().subscribe(result => {
      this.rows = result;
      this.search = [...result];
    });
  }
  searchFilter(event) {
    const val = event.target.value;
    const temp = this.search.filter((data) => {
      return (this.dateShow(data.date).indexOf(val) !== -1);
    });
    this.rows = temp;
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(FollowDialogComponent, {
      width: '750px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(resultAllDialog => {
      if (resultAllDialog !== undefined) {
        this.followService.addFollow(resultAllDialog)
          .mergeMap(() => this.followService.getFollow())
          .subscribe((valueFromDatabse) => {
            this.rows = valueFromDatabse;
          })
      }
    });
  }
  dateShow(date) {
    let year = String(Number(String(date).substr(0, 4)) + 543);
    let month = String(date).substr(5, 2);
    let day = String(date).substr(8, 2);
    return day + '/' + month + '/' + year;
  }
  openEditDialog(row): void {
    const dialogRef = this.dialog.open(FollowDialogComponent, {
      width: '750px',
      data: {
        date: row.date,
        folmytimeHour: row.folmytimeHour,
        folmytimeMinute: row.folmytimeMinute,
        folDuration: row.folDuration,
        folPurpose: row.folPurpose,
        personal: row.personal,
        personNameTitle: row.personNameTitle,
        personName: row.personName,
        personSurname: row.personSurname,
        treater: row.treater,

      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.followService.updateFollow(row._id, result)
          .mergeMap(() => this.followService.getFollow())
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
        this.followService.deleteFollow(row._id)
          .mergeMap(() => this.followService.getFollow())
          .subscribe((results) => {
            this.rows = results;
          });
      }
    });
  }
  openDetailDialog(view): void {
    const dialogRef = this.dialog.open(FollowDetailDialogComponent, {
      width: '750px',
      // height: '700px',

      data: {
        date: view.date,
        folmytimeHour: view.folmytimeHour,
        folmytimeMinute: view.folmytimeMinute,
        personal: view.personal,
        personNameTitle: view.personNameTitle,
        personName: view.personName,
        personSurname: view.personSurname,
        folDuration: view.folDuration,
        folPurpose: view.folPurpose,
        treater: view.treater,


      }
    });

    dialogRef.afterClosed().subscribe(resultAllDialog => {
      if (resultAllDialog !== undefined) {
        this.followService.addFollow(resultAllDialog)
          .mergeMap(() => this.followService.getFollow())
          .subscribe((valueFromDatabse) => {
            this.rows = valueFromDatabse;
          })
      }
    });
  }
}
