import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { BasicDataComponent } from './basic-data.component'
import { DiseaseComponent } from './disease/disease.component'

export const routes: Routes = [
    {
        path: '',
        component: BasicDataComponent
    },
    {
        path: 'disease',
        component: DiseaseComponent
    },
];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);