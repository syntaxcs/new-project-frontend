import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MenuModule } from '../theme/menu/menu.module';
import { HttpClientModule } from '@angular/common/http';
import { routing } from './personal-data.routing';

import { PersonalDataComponent } from './personal-data.component'
import { PersonalListComponent } from './personal-list/personal-list.component'

import { PersonalService } from '../shared/services/personal.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    routing,
    MenuModule,
    HttpClientModule,
  ],
  declarations: [
    PersonalListComponent,
    PersonalDataComponent
  ],
  entryComponents: [

  ],
  providers: [
    PersonalService
  ],
})
export class PersonalDataModule { }
