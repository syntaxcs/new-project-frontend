import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { MenuListComponent } from './menu-list/menu-list.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    MenuListComponent,
    MenuItemComponent,
  ],
  exports: [
    MenuListComponent,
  ]
})
export class MenuModule { }
