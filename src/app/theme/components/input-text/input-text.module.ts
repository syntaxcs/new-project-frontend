import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../shared/material.module';
import { FileUploadModule } from 'ng2-file-upload';
import { MatNativeDateModule } from '@angular/material';

import { AutocompletePersonalsComponent } from './autocomplete-personal/autocomplete-personal.component';
import { AutocompleteDiseasesComponent } from './autocomplete-disease/autocomplete-disease.component';
import { AutocompleteDrugmultiComponent } from './autocomplete-drugmulti/autocomplete-drugmulti.component';
import { TextNormalComponent } from './text-normal/text-normal.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { DropdownCertificateComponent } from './dropdown-certificate/dropdown-certificate.component';
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
    AutocompleteDiseasesComponent,
    AutocompleteDrugmultiComponent,
    AutocompletePersonalsComponent
  ],
  exports: [
    TextNormalComponent,
    DropdownComponent,
    DropdownCertificateComponent,
    AutocompleteDiseasesComponent,
    AutocompleteDrugmultiComponent,
    AutocompletePersonalsComponent
  ]
})
export class InputModule { }
