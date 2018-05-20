import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EditProfileDialogComponent } from './edit-profile-dialog.component';
import { GlobalState } from '../../../shared/global.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: any;
  constructor(
    public dialog: MatDialog,
    private _state: GlobalState
  ) { }

  ngOnInit() {
    this._state.subscribe('[User] UPDATE', (user) => {
      this.user = user;
    });
  }
  openDialogEditProfile(): void {
    const dialogRef = this.dialog.open(EditProfileDialogComponent, {
      width: '50%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
