import { Component, OnInit, NgModule } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'
import { GlobalState } from '../../../shared/global.state';
import { ConfirmDeleteDialogComponent } from '../../../theme/components/confirm-delete-dialog/confirm-delete-dialog.component';
import { GeneralDialogComponent } from './general-dialog/general-dialog.component';
import { GeneralService } from '../../../shared/services/general.service';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';


@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {
  public rows = [];
  public search = [];
  public id;
  public form: FormGroup;
  constructor(
    private _state: GlobalState,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private activatedroute: ActivatedRoute,
    private generalService: GeneralService,

  ) { this.id = this.activatedroute.snapshot.params['personalId']; }
  ngOnInit() {
    this.generalService.getGenById(this.id).subscribe(result => {
      this.rows = result;
      this.search = [...result];
    });
  }
  dateShow(date) {
    let year = String(Number(String(date).substr(0, 4)) + 543);
    let month = String(date).substr(5, 2);
    let day = String(date).substr(8, 2);
    return day + '/' + month + '/' + year;
  }
  
  searchFilter(event) {
    const val = event.target.value;
    const temp = this.search.filter((data) => {
      return (this.dateSearch(data.date).indexOf(val) !== -1);
    });
    this.rows = temp;
  }
  dateSearch(date) {
    let year = String(Number(String(date).substr(0, 4)) + 543);
    let month = String(date).substr(5, 2);
    return month + '/' + year;
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(GeneralDialogComponent, {
      width: '750px',
      data: { personId: this.id }
    });

    dialogRef.afterClosed().subscribe(resultAllDialog => {
      if (resultAllDialog !== undefined) {
        this.generalService.addGen(resultAllDialog)
          .mergeMap(() => this.generalService.getGenById(this.id))
          .subscribe((valueFromDatabse) => {
            this.rows = valueFromDatabse;
            this.search = [...valueFromDatabse];
          })
      }
    });
  }
  openEditDialog(row): void {
    const dialogRef = this.dialog.open(GeneralDialogComponent, {
      width: '750px',
      data: {
        date: row.date,
        time: row.time,
        genSymptoms: row.genSymptoms,
        genPresentHistory: row.genPresentHistory,
        genPastHistory: row.genPastHistory,
        genCongenitalDisease: row.genCongenitalDisease,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.generalService.updateGen(row._id, result)
          .mergeMap(() => this.generalService.getGenById(this.id))
          .subscribe((results) => {
            this.rows = results;
            this.search = [...results];
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
        this.generalService.deleteGen(row._id)
          .mergeMap(() => this.generalService.getGenById(this.id))
          .subscribe((results) => {
            this.rows = results;
            this.search = [...results];
          });
      }
    });
  }

}
