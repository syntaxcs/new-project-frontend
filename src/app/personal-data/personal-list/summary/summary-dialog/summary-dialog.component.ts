import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DrugService } from '../../../../shared/services/drug.service';
import { DiseaseService } from '../../../../shared/services/disease.service';
import { from } from 'rxjs/internal/observable/from';
import { TreatmentService } from '../../../../shared/services/treatment.service'

@Component({
  selector: 'app-summary-dialog',
  templateUrl: './summary-dialog.component.html',
  styleUrls: ['./summary-dialog.component.css']
})
export class SummaryDialogComponent implements OnInit {
  public form: FormGroup;
  public duration = ['ในเวลา', 'นอกเวลา'];
  public certificate = [];
  public treat = [];
  checkboxTreat = [];
  treatMents = [];
  disProcedure = '';
  date: Date;
  brithDay: Date;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<SummaryDialogComponent>,
    private drugservice: DrugService,
    private diseaseService: DiseaseService,
    private treatmentservice: TreatmentService

  ) {
    this.editMode();
  }
  ngOnInit() {
    this.form = this.formBuilder.group({});
    this.treatmentservice.getTreat().subscribe(result => {
      this.treat = result;
      if (this.data.treatment !== undefined) {
        this.editTreat();
      }
    })
  }
  editMode() {
    if (this.data.date !== undefined) {
      if (this.data.date !== undefined) {
        this.date = new Date(this.data.date);
        this.date.setDate(this.date.getDate() - 1);
      }
      if (this.data.time !== undefined) {
        this.brithDay = this.data.time
      }
      if (this.data.disease !== undefined) {
        this.check(this.data.disease);
      }
    }
  }
  editTreat(){
    let bool = []; let index = 0;
    this.treat.forEach(element => {
      this.data.treatment.forEach(treat => {
        if(element._id === treat._id){
          bool.push(index);
          this.treatMents.push(treat)
          return;
        } 
      })
      index++;
    })
    for (let i = 0; i<this.treat.length; i++){
      if (i == bool[i])this.checkboxTreat.push(true);
      else this.checkboxTreat.push(false);
    }
  }
  toggle(check, data) {
    if (check === true) {
      this.treatMents.push(data)
    } else {
      const index: number = this.treatMents.indexOf(data);
      if (index !== -1) {
        this.treatMents.splice(index, 1);
      }
    }
  }
  check(data) {
    this.disProcedure = data.disProcedure;
  }
  onClose() {
    this.dialogRef.close(/*sent value to tab-supervision*/);
  }
  onSave() {
    const value = this.form.value;
    value.disease = this.data.disease._id
    value.treatment = this.treatMents;
    value.personId = this.data.personId;
    value.date = this.date;
    value.time = this.brithDay;
    console.log(value.treatment)
    this.dialogRef.close(value);
  }


}
