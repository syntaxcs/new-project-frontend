import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {Observable} from 'rxjs/Rx';
import { GlobalState } from '../../shared/global.state';
import { FollowDialogComponent} from './follow-dialog/follow-dialog.component';
import { FollowService } from '../../shared/services/follow.service';
import { ConfirmDeleteDialogComponent } from '../../theme/components/confirm-delete-dialog/confirm-delete-dialog.component';
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
  ) { }

  ngOnInit() {
    this._state.notifyDataChanged('[Breadcrumbs] changed', [{ url: '/', title: 'หน้าแรก' }, { title: 'การนัดหมาย' }]);
    this.form = this.formBuilder.group({});
    this.followService.getFollow().subscribe(result => {
      this.rows = result;
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
  openEditDialog(row): void {
    const dialogRef = this.dialog.open(FollowDialogComponent, {
      width: '750px',
      data: {
        folDate: row.folDate,
        folmytimeHour: row.folmytimeHour,
        folmytimeMinute: row.folmytimeMinute,
        folName: row.folName,
        folSurName: row.folSurName,
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
        content: 'การนัดหมาย: ' + row.cerLicensed_No
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
}
