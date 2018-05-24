import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { PersonalDataComponent } from './personal-data.component';
export const routes: Routes = [
    {
        path: '',
        component: PersonalDataComponent
    },
];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);