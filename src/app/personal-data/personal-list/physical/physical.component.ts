import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'
import { GlobalState } from '../../../shared/global.state';
import { ConfirmDeleteDialogComponent } from '../../../theme/components/confirm-delete-dialog/confirm-delete-dialog.component';
import { PhysicalDialogComponent } from './physical-dialog/physical-dialog.component';
import { PhysicalDetailDialogComponent } from './physical-dialog-detail/physical-dialog-detail.component';
import { PhysicalService } from '../../../shared/services/physical.service';

@Component({
  selector: 'app-physical',
  templateUrl: './physical.component.html',
  //   styleUrls: ['./physical.component.scss']
})
export class PhysicalComponent implements OnInit {
  public rows = [];
  public id;
  public search = [];
  constructor(
    private _state: GlobalState,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private activatedroute: ActivatedRoute,
    private physicalService: PhysicalService,

  ) { this.id = this.activatedroute.snapshot.params['personalId']; }

  ngOnInit() {
    this.physicalService.getPhyById(this.id).subscribe(result => {
      this.rows = result;
      this.search = [...result];
    });
  }
  calculateBMI(value) {
    return String((Number(value.phyWeight) / Math.pow(Number(value.phyHeight), 2)) * 10000).substr(0, 5);
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
    const dialogRef = this.dialog.open(PhysicalDialogComponent, {
      width: '750px',
      height: '800px',
      data: { personId: this.id }
    });

    dialogRef.afterClosed().subscribe(resultAllDialog => {
      if (resultAllDialog !== undefined) {
        this.physicalService.addPhy(resultAllDialog)
          .mergeMap(() => this.physicalService.getPhyById(this.id))
          .subscribe((valueFromDatabse) => {
            this.rows = valueFromDatabse;
            this.search = [...valueFromDatabse];
          })
      }
    });
  }
  openDetailDialog(view): void {
    const dialogRef = this.dialog.open(PhysicalDetailDialogComponent, {
      width: '750px',
      data: {
        phyTemp: view.phyTemp,
        phyBp: view.phyBp,
        phyHeight: view.phyHeight,
        phyWeight: view.phyWeight,
        phyBodyParth: view.phyBodyParth,
        phyLevel: view.phyLevel,
        phyPulse: view.phyPulse,
        phyRespirationRate: view.phyRespirationRate,
      }
    });
  }
  openEditDialog(row): void {
    const dialogRef = this.dialog.open(PhysicalDialogComponent, {
      width: '750px',
      height: '800px',
      data: {
        date: row.date,
        time: row.time,
        phyTemp: row.phyTemp,
        phyBp: row.phyBp,
        phyHeight: row.phyHeight,
        phyWeight: row.phyWeight,
        phyBodyParth: row.phyBodyParth,
        phyLevel: row.phyLevel,
        phyPulse: row.phyPulse,
        phyRespirationRate: row.phyRespirationRate,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.physicalService.updatePhy(row._id, result)
          .mergeMap(() => this.physicalService.getPhyById(this.id))
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
        this.physicalService.deletePhy(row._id)
          .mergeMap(() => this.physicalService.getPhyById(this.id))
          .subscribe((results) => {
            this.rows = results;
            this.search = [...results];
          });
      }
    });
  }
}
