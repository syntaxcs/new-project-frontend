import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../shared/material.module';
import { FileUploadModule } from 'ng2-file-upload';
import { MatNativeDateModule } from '@angular/material';

import { TextNormalComponent } from './text-normal/text-normal.component';
import { DropdownComponent } from './dropdown/dropdown.component';
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
    DropdownComponent
  ],
  exports: [
    TextNormalComponent,
    DropdownComponent
  ]
})
export class InputModule { }
