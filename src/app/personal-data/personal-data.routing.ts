import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { PersonalDataComponent } from './personal-data.component';
import { PersonalListComponent } from './personal-list/personal-list.component';
export const routes: Routes = [
    {
        path: '',
        component: PersonalDataComponent
    },
    {
        path: 'personal-list',
        component: PersonalListComponent
    },
];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);