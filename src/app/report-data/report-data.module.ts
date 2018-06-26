import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MenuModule } from '../theme/menu/menu.module';
import { routing } from './report-data.routing';

import { ReportDataComponent } from './report-data.component';
import { ReportComponent } from './report/report.component';
import { ReportDetailDialogComponent } from './report/report-dialog-detail/report-dialog-detail.component';
import { ReportDialogComponent } from './report/report-dialog/report-dialog.component';

import { SummaryService } from '../shared/services/summary.service';

@NgModule({
  imports: [
    CommonModule,
    MenuModule,
    routing,
    SharedModule
  ],
  declarations: [
    ReportDataComponent,
    ReportComponent,
    ReportDetailDialogComponent,
    ReportDialogComponent,

  ],
  entryComponents: [
    ReportDetailDialogComponent,
    ReportDialogComponent
  ],
  providers: [
    SummaryService
  ]
})
export class ReportDataModule { }
