import { Component, Input, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit, OnDestroy {

  @Input() data = [];
  @Input() placeholder: string;
  @Input() text: string;
  @Input() formGroup: FormGroup;
  @Input() name: string;
  @Input() value: string;
  @Output() change: EventEmitter<any> = new EventEmitter();
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formGroup.addControl(this.name, this.formBuilder.control(this.value, [Validators.required]));
  }
  ngOnDestroy() {
    this.formGroup.removeControl(this.name);
  }
}
