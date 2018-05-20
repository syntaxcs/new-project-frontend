import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-text-normal',
  templateUrl: './text-normal.component.html',
  styleUrls: ['./text-normal.component.scss']
})
export class TextNormalComponent implements OnInit, OnDestroy {
  @Input() placeholder: string;
  @Input() text: string;
  @Input() formGroup: FormGroup;
  @Input() name: string;
  @Input() value: string;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
      this.formGroup.addControl(this.name, this.formBuilder.control(this.value, [Validators.required]));
  }
  ngOnDestroy() {
    this.formGroup.removeControl(this.name);
  }
}
