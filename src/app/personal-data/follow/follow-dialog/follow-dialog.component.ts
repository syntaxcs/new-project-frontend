import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { CertificateService } from '../../../shared/services/certificate.service';
// import { Router } from '@angular/router';
// import { PersonalService } from '../../../shared/services/personal.service';

@Component({
  selector: 'app-follow-dialog',
  templateUrl: './follow-dialog.component.html',
  styleUrls: ['./follow-dialog.component.css']
})
export class FollowDialogComponent implements OnInit {
  public treaterNames= [];
  public rows = [];
  public form: FormGroup;
  date: Date;
  startDate: any;
  brithDay: Date;
  public time = ['06.00', '06.30', '07.00', '07.30', '08.00', '08.30', '09.00', '09.30', '10.00', '10.30', '11.00',
    '11.30', '12.00', '12.30', '13.00', '13.30', '14.00', '14.30', '15.00', '15.30', '16.00', '16.30',
    '17.00', '17.30', '18.00', '18.30', '19.00', '19.30', '20.00', '20.30', '21.00', '21.30', '22.00',
    '22.30', '23.00', '23.30', '24.00'];
  public duration = ['ในเวลา','นอกเวลา'];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<FollowDialogComponent>,
    private certificateService: CertificateService,
    // private router: Router,
    // private personalService: PersonalService,
  ) {
    let year = new Date().getFullYear() + 543;
    let month = new Date().getMonth()
    this.startDate = new Date(year, month + 1, null, null, null, null);
   }
  ngOnInit() {
    this.form = this.formBuilder.group({});
    this.calculateYear();
    this.certificateService.getCer().subscribe(result => {
      this.treaterNames= result;
      })
  }
  calculateYear() {
    // let year = new Date().getFullYear() + 543;
    // let month = new Date().getMonth()
    // this.startDate = new Date(year, month+1, null, null, null, null);
  }
  onClose() {
    this.dialogRef.close(/*sent value to tab-supervision*/);
  }
  onSave() {
    const value = this.form.value;
    value.personId = this.data.personId
    value.folDate = this.date;
    this.dialogRef.close(value);
  }
  // findPerson(userPerson) {
  //   if (userPerson !== '' || userPerson !== undefined) {
  //     this.rows.forEach(element => {
  //       if (element.personId === userPerson) {
  //         this.router.navigate(['personal-data/follow/follow-dialog', element._id]);
  //       }
  //     })
  //   }
  // }
}
