import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { PersonalDataComponent } from './personal-data.component';
import { PersonalComponent } from './personal/personal.component';
import { PersonalListComponent } from './personal-list/personal-list.component';
import { FollowComponent } from './follow/follow.component';
import { CertificateComponent } from './certificate/certificate.component';
// import { PhysicalComponent} from './personal-list/physical/physical.component';
import { from } from 'rxjs/internal/observable/from';
export const routes: Routes = [
    {
        path: '',
        component: PersonalDataComponent
    },
    {
        path: 'personal',
        component: PersonalComponent
    },
    {
        path: 'personal/personal-list/:personalId',
        component: PersonalListComponent
    },
    {
        path: 'follow',
        component: FollowComponent
    },
    {
        path: 'certificate',
        component: CertificateComponent
    },
    // {
    //     path: 'physical',
    //     component: PhysicalComponent
    // },

];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);