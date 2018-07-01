import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import 'rxjs/add/operator/mergeMap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MaterialModule } from './material.module';
import { FileUploadModule } from 'ng2-file-upload';
import { ThemeModule } from '../theme/theme.module';
import { HttpClientModule } from '@angular/common/http';
import { PdfViewerModule } from 'ng2-pdf-viewer';
@NgModule({
  imports: [
    HttpClientModule,
  ],
  exports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FileUploadModule,
    ThemeModule,
    NgxDatatableModule,
    PdfViewerModule
  ],
  declarations: []
})
export class SharedModule { }