import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'
import { GlobalState } from '../../../shared/global.state';
import { ConfirmDeleteDialogComponent } from '../../../theme/components/confirm-delete-dialog/confirm-delete-dialog.component';
import { PhysicalDialogComponent } from './physical-dialog/physical-dialog.component';
import { PhysicalService} from '../../../shared/services/physical.service';
@Component({
  selector: 'app-physical',
  templateUrl: './physical.component.html',
//   styleUrls: ['./physical.component.scss']
})
export class PhysicalComponent implements OnInit {
  public rows = [];
  public id;
  public phyHeight: number;
  public phyWeight: number;
  public answer;
  constructor(
    private _state: GlobalState,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private activatedroute: ActivatedRoute,
    private physicalService: PhysicalService,

  ) { }//this.id = this.activatedroute.snapshot.params['personalId']; }

  ngOnInit() {
    this.physicalService.getPhy().subscribe(result => {
      this.rows = result;
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(PhysicalDialogComponent, {
      width: '750px',
      height: '800px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(resultAllDialog => {
      if (resultAllDialog !== undefined) {
        this.physicalService.addPhy(resultAllDialog)
          .mergeMap(() => this.physicalService.getPhy())
          .subscribe((valueFromDatabse) => {
            this.rows = valueFromDatabse;
          })
      }
    });
  }
  openEditDialog(row): void {
    const dialogRef = this.dialog.open(PhysicalDialogComponent, {
        width: '750px',
        data: {
            phyTemp: row.phyTemp,
            phyBp: row.phyBp,
            phyHeight: row.phyHeight,
            phyWeight: row.phyWeight,
            phyBodyParth: row.phyBodyParth,
            phyLevel: row. phyLevel,
            phyPulse: row.phyPulse,
            phyRespirationRate: row.phyRespirationRate,
        }
    });
    dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
          this.physicalService.updatePhy(row._id, result)
          .mergeMap(() => this.physicalService.getPhy())
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
        this.physicalService.deletePhy(row._id)
          .mergeMap(() => this.physicalService.getPhy())
          .subscribe((results) => {
            this.rows = results;
          });
      }
    });
  }
  calculate() {
    this.answer = String((this.phyWeight / Math.pow(this.phyHeight, 2))*10000).substr(0, 5);
    
  }
}
