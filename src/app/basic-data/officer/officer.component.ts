import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { GlobalState } from '../../shared/global.state';
import { OfficerDialogComponent } from './officer-dialog/officer-dialog.component';
import { OfficerService } from '../../shared/services/officer.service';
import { ConfirmDeleteDialogComponent } from '../../theme/components/confirm-delete-dialog/confirm-delete-dialog.component';
@Component({
  selector: 'app-officer',
  templateUrl: './officer.component.html',
  styleUrls: ['./officer.component.css']
})
export class OfficerComponent implements OnInit {
  public rows = [];
  public search = [];
  public form: FormGroup;
  constructor(
    private _state: GlobalState,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private officerService: OfficerService,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({});
    this.officerService.getFicer().subscribe(result => {
      this.rows = result;
      this.search = [...this.rows];
    });
  }
  searchFilter(event) {
    const val = event.target.value;
      const temp = this.search.filter((data) => {
        return data.ficerLicensed_No.indexOf(val) !== -1 ||
          data.ficerName.indexOf(val) !== -1 ||
          data.ficerSurName.indexOf(val) !== -1 || !val;
      });
      this.rows = temp;
    }
    openDialog(): void {
      const dialogRef = this.dialog.open(OfficerDialogComponent, {
        width: '750px',
        data: {
        }
      });
      dialogRef.afterClosed().subscribe(resultAllDialog => {
        if (resultAllDialog !== undefined) {
          this.officerService.addFicer(resultAllDialog)
            .mergeMap(() => this.officerService.getFicer())
            .subscribe((valueFromDatabse) => {
              this.rows = valueFromDatabse;
              this.search = [...valueFromDatabse];
            })
        }
      });
    }
    openEditDialog(row): void {
      const dialogRef = this.dialog.open(OfficerDialogComponent, {
        width: '750px',
        data: {
          ficerLicensed_No: row.ficerLicensed_No,
          ficerNameTitle: row.ficerNameTitle,
          ficerName: row.ficerName,
          ficerSurName: row.ficerSurName
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
          this.officerService.updateFicer(row._id, result)
            .mergeMap(() => this.officerService.getFicer())
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
          content:  'ข้อมูลที่ถูกลบจะไม่สามารถกู้คืนได้ !'
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result.status === true) {
          this.officerService.deleteFicer(row._id)
            .mergeMap(() => this.officerService.getFicer())
            .subscribe((results) => {
              this.rows = results;
              this.search = [...results];
            });
        }
      });
    }
}
