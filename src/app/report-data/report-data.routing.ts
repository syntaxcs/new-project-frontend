import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ReportDataComponent } from './report-data.component';
import { from } from 'rxjs/internal/observable/from';
export const routes: Routes = [
    {
        path: '',
        component: ReportDataComponent
    },
];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);