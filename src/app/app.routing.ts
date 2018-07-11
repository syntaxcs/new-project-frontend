import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { LayoutComponent } from './theme/layout/layout.component';

export const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
      },
      {
        path: 'basic-data',
        loadChildren: './basic-data/basic-data.module#BasicDataModule',
      },
      {
        path: 'personal-data',
        loadChildren: './personal-data/personal-data.module#PersonalDataModule',
      },
      {
        path: 'report-data',
        loadChildren: './report-data/report-data.module#ReportDataModule',
      },
      {
        path: 'login',
        loadChildren: './login/login.module#LoginModule',
      }
    ]
  },
  { path: 'login', loadChildren: './login/login.module#LoginModule', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
