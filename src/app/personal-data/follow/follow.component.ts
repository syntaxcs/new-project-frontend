import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable} from 'rxjs/Rx';
import { GlobalState } from '../../shared/global.state';
import { FollowDialogComponent} from './follow-dialog/follow-dialog.component';
import { FollowService } from '../../shared/services/follow.service';
import { ConfirmDeleteDialogComponent } from '../../theme/components/confirm-delete-dialog/confirm-delete-dialog.component';
import { FollowDetailDialogComponent } from './follow-dialog-detail/follow-dialog-detail.component';
// import { TreaterService } from '../../shared/services/treater.service';
@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.scss']
})
export class FollowComponent implements OnInit {
  public rows = [];
  public form: FormGroup;
  constructor(
    private _state: GlobalState,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private followService: FollowService,
    // private treaterService: TreaterService,
  ) { }

  ngOnInit() {
    this._state.notifyDataChanged('[Breadcrumbs] changed', [{ url: '/', title: 'หน้าแรก' }, { title: 'การนัดหมาย' }]);
    this.form = this.formBuilder.group({});
    this.followService.getFollow().subscribe(result => {
      
      this.rows = result;
      console.log( this.rows)
    });
    
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(FollowDialogComponent, {
      width: '750px',
      data: {
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
  dateShow(date) {
    return String(date).substr(0, 10)
  }
  openEditDialog(row): void {
    const dialogRef = this.dialog.open(FollowDialogComponent, {
      width: '750px', 
      data: {
        folDate: row.folDate,
        folmytimeHour: row.folmytimeHour,
        folmytimeMinute: row.folmytimeMinute,
        folName: row.folName,
        folSurName: row.folSurName,
        folDuration: row.folDuration,
        folPurpose: row.folPurpose,
        treNameTitle: row.treNameTitle,
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
        content:  'ข้อมูลที่ถูกลบจะไม่สามารถกู้คืนได้ !'
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
        folDate: view.folDate,
        folmytimeHour: view.folmytimeHour,
        folmytimeMinute: view.folmytimeMinute,
        personNameTitle: view.personNameTitle,
        personName: view.personName,
        personSurname: view.personSurname,
        folDuration: view.folDuration,
        treNameTitle: view.treNameTitle,

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
