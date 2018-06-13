import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MenuModule } from '../theme/menu/menu.module';
import { routing } from './report-data.routing';

import { ReportDataComponent } from './report-data.component';
import { ReportComponent } from './report/report.component';

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
    ReportComponent
  ],
  providers: [
    SummaryService
  ]
})
export class ReportDataModule { }
