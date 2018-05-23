import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { PersonalListComponent} from './personal-list.component';
export const routes: Routes = [
  {
    path: 'personal-list',
    component: PersonalListComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
