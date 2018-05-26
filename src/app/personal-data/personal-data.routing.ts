import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { PersonalDataComponent } from './personal-data.component';
import { PersonalListComponent } from './personal-list/personal-list.component';
// import { PhysicalComponent} from './personal-list/physical/physical.component';
import { from } from 'rxjs/internal/observable/from';
export const routes: Routes = [
    {
        path: '',
        component: PersonalDataComponent
    },
    {
        path: 'personal-list',
        component: PersonalListComponent
    },
    // {
    //     path: 'physical',
    //     component: PhysicalComponent
    // },
    
];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);