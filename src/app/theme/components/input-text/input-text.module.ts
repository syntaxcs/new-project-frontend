import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../shared/material.module';
import { FileUploadModule } from 'ng2-file-upload';
import { MatNativeDateModule } from '@angular/material';

import { AutocompletePersonalsComponent } from './autocomplete-personal/autocomplete-personal.component';
import { AutocompleteDiseasesComponent } from './autocomplete-disease/autocomplete-disease.component';
import { AutocompleteDrugmultiComponent } from './autocomplete-drugmulti/autocomplete-drugmulti.component';
import { AutocompleteTreatmultiComponent } from './autocomplete-treatment/autocomplete-treatment.component';
import { TextNormalComponent } from './text-normal/text-normal.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { DropdownCertificateComponent } from './dropdown-certificate/dropdown-certificate.component';
import { DropdownOfficerComponent } from './dropdown-officer/dropdown-officer.component';
import { from } from 'rxjs/internal/observable/from';
@NgModule({
  imports: [
    MaterialModule,
    FileUploadModule,
    CommonModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    TextNormalComponent,
    DropdownComponent,
    DropdownCertificateComponent,
    DropdownOfficerComponent,
    AutocompleteDiseasesComponent,
    AutocompleteDrugmultiComponent,
    AutocompletePersonalsComponent,
    AutocompleteTreatmultiComponent
  ],
  exports: [
    TextNormalComponent,
    DropdownComponent,
    DropdownCertificateComponent,
    DropdownOfficerComponent,
    AutocompleteDiseasesComponent,
    AutocompleteDrugmultiComponent,
    AutocompletePersonalsComponent,
    AutocompleteTreatmultiComponent
  ]
})
export class InputModule { }
