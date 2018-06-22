import { Component, OnInit ,Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-officer-dialog',
  templateUrl: './officer-dialog.component.html',
  styleUrls: ['./officer-dialog.component.css']
})
export class OfficerDialogComponent implements OnInit {
  public form: FormGroup;
  public nametitle = ['นาย', 'นาง', 'นางสาว'];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<OfficerDialogComponent>,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({});
  }
  onClose() {
    this.dialogRef.close(/*sent value to tab-supervision*/);
  }
  onSave() {
    const value = this.form.value;
    this.dialogRef.close(value);
  }
}
