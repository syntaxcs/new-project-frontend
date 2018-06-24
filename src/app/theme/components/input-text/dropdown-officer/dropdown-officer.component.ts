import { Component, Input, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OfficerService} from '../../../../shared/services/officer.service';
@Component({
  selector: 'app-dropdown-officer',
  templateUrl: './dropdown-officer.component.html',
})
export class DropdownOfficerComponent implements OnInit, OnDestroy {

  public data = [];
  @Input() placeholder: string;
  @Input() text: string;
  @Input() formGroup: FormGroup;
  @Input() name: string;
  @Input() value: string;
  @Output() change: EventEmitter<any> = new EventEmitter();
  constructor(private formBuilder: FormBuilder,
    private officerService: OfficerService) { }

  ngOnInit() {
    this.formGroup.addControl(this.name, this.formBuilder.control(this.value, [Validators.required]));
    this.officerService.getFicer().subscribe(result => {
      this.data = result;
    })
  }
  ngOnDestroy() {
    this.formGroup.removeControl(this.name);
  }
}
