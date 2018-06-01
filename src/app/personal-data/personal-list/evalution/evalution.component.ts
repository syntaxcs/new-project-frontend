import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'
import { GlobalState } from '../../../shared/global.state';
import { ConfirmDeleteDialogComponent } from '../../../theme/components/confirm-delete-dialog/confirm-delete-dialog.component';
import { EvalutionDialogComponent } from './evalution-dialog/evalution-dialog.component';
import { EvalutionService } from '../../../shared/services/evalution.service';
@Component({
  selector: 'app-evalution',
  templateUrl: './evalution.component.html',
  //   styleUrls: ['./evalution.component.scss']
})
export class EvalutionComponent implements OnInit {
  public rows = [];
  public id;
  constructor(
    private _state: GlobalState,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private activatedroute: ActivatedRoute,
    private evalutionService: EvalutionService,

  ) { this.id = this.activatedroute.snapshot.params['personalId']; }

  ngOnInit() {
    this.evalutionService.getEvaById(this.id).subscribe(result => {
      this.rows = result;
      console.log(this.rows)
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(EvalutionDialogComponent, {
      width: '750px',
      data: { personId: this.id }
    });

    dialogRef.afterClosed().subscribe(resultAllDialog => {
      if (resultAllDialog !== undefined) {
        this.evalutionService.addEva(resultAllDialog)
          .mergeMap(() => this.evalutionService.getEvaById(this.id))
          .subscribe((valueFromDatabse) => {
            this.rows = valueFromDatabse;
          })
      }
    });
  }
  openEditDialog(row): void {
    const dialogRef = this.dialog.open(EvalutionDialogComponent, {
      width: '750px',
      data: {
        evaDate: row.evaDate,
        evaAfter: row.evaAfter,
        evaBodyParth: row.evaBodyParth,
        evaLevel: row.evaLevel
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.evalutionService.updateEva(row._id, result)
          .mergeMap(() => this.evalutionService.getEvaById(this.id))
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
        this.evalutionService.deleteEva(row._id)
          .mergeMap(() => this.evalutionService.getEvaById(this.id))
          .subscribe((results) => {
            this.rows = results;
          });
      }
    });
  }

}
