
import { NgModule } from '@angular/core';
import { MenuModule } from '../theme/menu/menu.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { routing } from './dashboard.routing';
@NgModule({
  imports: [
    SharedModule,
    MenuModule,
    routing,
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
