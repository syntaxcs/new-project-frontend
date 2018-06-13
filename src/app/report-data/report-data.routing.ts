import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ReportDataComponent } from './report-data.component';
import { ReportComponent } from './report/report.component';
import { from } from 'rxjs/internal/observable/from';
export const routes: Routes = [
    {
        path: '',
        component: ReportDataComponent
    },
    {
        path: 'report',
        component: ReportComponent
    },
];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);