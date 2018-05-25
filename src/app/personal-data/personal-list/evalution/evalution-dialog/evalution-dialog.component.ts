import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-evalution-dialog',
    templateUrl: './evalution-dialog.component.html',
    //   styleUrls: ['./evalution-dialog.component.css']
})
export class EvalutionDialogComponent implements OnInit {
    public form: FormGroup;
    public bodyparth = ['ศีรษะ', 'ต้นคอ', 'บ่า', 'ไหล่ ', 'หลัง-เอว '
        , 'ขา-เท้า', 'ข้อเท้า ', 'เข่า', 'ข้อศอก', 'ข้อมือ/ข้อนิ้ว', 'อ่อนเเรงข้างซ้าย', 'อ่อนแรงข้างขวา', 'อ่อนแรงทั้งสองข้าง'];
    public images = [
        {
            name: 'ศรีษะ',
            img: '../assets/images/ศีรษะ.jpg'
        },
        {
            name: 'ไหล่',
            img: '../assets/images/bed.png'
        },
        {
            name: 'สะโพก',
            img: '../assets/images/home.png'
        },

    ]
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<EvalutionDialogComponent>,
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
