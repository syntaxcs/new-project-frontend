import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-personal-dialog',
  templateUrl: './personal-dialog.component.html',
  styleUrls: ['./personal-dialog.component.css']
})
export class PersonalDialogComponent implements OnInit {
  public form: FormGroup;
  startDate: any;
  gender: String;
  brithDay: Date;
  public nametitle = ['นาย', 'นาง', 'นางสาว'];
  public status = ['โสด ( Single )', 'แต่งงาน ( Married )', 'หม้าย ( Widowed )', 'หย่า ( Divorced )'
    , 'แยกกันอยู่ ( Separated )', 'นักบวช ( Monk )'];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<PersonalDialogComponent>,
  ) { 
    this.gender = this.data.personGender;
    if (this.data.personBirth !== undefined) {
      this.brithDay = new Date(this.data.personBirth);
      this.brithDay.setDate(this.brithDay.getDate() - 1);
    }
  }
  ngOnInit() {
    this.form = this.formBuilder.group({});
    this.calculateYear();
  }
  calculateYear() {
    let year = new Date().getFullYear();
    let month = new Date().getMonth()
    this.startDate = new Date(year, month+1, null, null, null, null);
  }
  onClose() {
    this.dialogRef.close(/*sent value to tab-supervision*/);
  }
  onSave() {
    const value = this.form.value;
    value.personGender = this.gender;
    value.personBirth = this.brithDay;
    value.personBirth.setDate(this.brithDay.getDate() + 1);
    this.dialogRef.close(value);
  }
}
