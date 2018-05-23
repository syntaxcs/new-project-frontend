import { NgModule } from '@angular/core';
import { MenuModule } from '../theme/menu/menu.module';
import { PersonalListComponent} from './personal-list.component';
import { SharedModule } from '../shared/shared.module';
import { routing } from './personal-list.routing';
@NgModule({
  imports: [
    SharedModule,
    MenuModule,
    routing,
  ],
  declarations: [PersonalListComponent]
})
export class PersonalListModule { }
