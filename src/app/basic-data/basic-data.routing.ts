import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { BasicDataComponent } from './basic-data.component';
import { DiseaseComponent } from './disease/disease.component';
import { TreaterComponent } from './treater/treater.component';
import { RemedyComponent } from './remedy/remedy.component';
import { DrugComponent } from './drug/drug.component';

export const routes: Routes = [
    {
        path: '',
        component: BasicDataComponent
    },
    {
        path: 'disease',
        component: DiseaseComponent
    },
    {
        path: 'treater',
        component: TreaterComponent
    },
    {
        path: 'remedy',
        component: RemedyComponent
    },
    {
        path: 'drug',
        component: DrugComponent
    },
];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);