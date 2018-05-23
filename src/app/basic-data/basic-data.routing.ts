import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { BasicDataComponent } from './basic-data.component'
import { DiseaseComponent } from './disease/disease.component'
import { TreaterComponent } from './treater/treater.component'
<<<<<<< HEAD
import { RemedyComponent } from './remedy/remedy.component'
=======
import { DrugComponent } from './drug/drug.component';
import { FollowComponent } from './follow/follow.component';
import { PersonalComponent } from './personal/personal.component';

>>>>>>> 78f26e21abf12c14d0366712b5fbc907959789f9

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
<<<<<<< HEAD
        path: 'remedy',
        component: RemedyComponent
    },
=======
        path: 'drug',
        component: DrugComponent
    },
    {
        path: 'follow',
        component: FollowComponent
    },
    {
        path: 'personal',
        component: PersonalComponent
    },
    
>>>>>>> 78f26e21abf12c14d0366712b5fbc907959789f9
];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);