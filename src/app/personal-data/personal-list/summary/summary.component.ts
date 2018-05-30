import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'
import { GlobalState } from '../../../shared/global.state';
import { ConfirmDeleteDialogComponent } from '../../../theme/components/confirm-delete-dialog/confirm-delete-dialog.component';
import { SummaryDialogComponent } from './summary-dialog/summary-dialog.component';
import { DiseaseService } from '../../../shared/services/disease.service';
import {DrugService} from '../../../shared/services/drug.service';
import {TreatmentService } from '../../../shared/services/treatment.service';
import { from } from 'rxjs/internal/observable/from';
@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  //   styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  public rows = [];
  public row2 = [];
  public row3 = [];
  public id;

  constructor(
    private _state: GlobalState,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private activatedroute: ActivatedRoute,
    private diseaseService: DiseaseService,
    private drugService: DrugService,
    private treatmentService: TreatmentService,

  ) { }//this.id = this.activatedroute.snapshot.params['personalId'];  }

  ngOnInit() {
    this.diseaseService.getDis().subscribe(result => {
      this.rows = result;
    });
    this.drugService.getDrug().subscribe(result => {
      this.row2 = result;
    });
    this.treatmentService.getTreat().subscribe(result => {
      this.row3= result;
    });
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(SummaryDialogComponent, {
      width: '750px',
      height: '800px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(resultAllDialog => {
      if (resultAllDialog !== undefined) {
        this.diseaseService.addDis(resultAllDialog)
          .mergeMap(() => this.diseaseService.getDis())
          .subscribe((valueFromDatabse) => {
            this.rows = valueFromDatabse;
          })
      }
    });
  }

  openEditDialog(row): void {
    const dialogRef = this.dialog.open(SummaryDialogComponent, {
      width: '750px',
      data: {
       
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.diseaseService.updateDis(row._id, result)
          .mergeMap(() => this.diseaseService.getDis())
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
        this.diseaseService.deleteDis(row._id)
          .mergeMap(() => this.diseaseService.getDis())
          .subscribe((results) => {
            this.rows = results;
          });
      }
    });
  }

}
