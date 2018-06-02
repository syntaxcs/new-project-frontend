import { Component, Input, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CertificateService } from '../../../../shared/services/certificate.service';
@Component({
  selector: 'app-dropdown-certificate',
  templateUrl: './dropdown-certificate.component.html',
  styleUrls: ['./dropdown-certificate.component.scss']
})
export class DropdownCertificateComponent implements OnInit, OnDestroy {

  public data = [];
  @Input() placeholder: string;
  @Input() text: string;
  @Input() formGroup: FormGroup;
  @Input() name: string;
  @Input() value: string;
  @Output() change: EventEmitter<any> = new EventEmitter();
  constructor(private formBuilder: FormBuilder,
    private certificateservice: CertificateService) { }

  ngOnInit() {
    this.formGroup.addControl(this.name, this.formBuilder.control(this.value, [Validators.required]));
    this.certificateservice.getCer().subscribe(result => {
      this.data = result;
    })
  }
  ngOnDestroy() {
    this.formGroup.removeControl(this.name);
  }
}
