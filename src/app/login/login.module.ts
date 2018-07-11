
import { NgModule } from '@angular/core';
import { MenuModule } from '../theme/menu/menu.module';
import { LoginComponent } from './login.component';
import { SharedModule } from '../shared/shared.module';
import { routing } from './login.routing';
@NgModule({
  imports: [
    SharedModule,
    MenuModule,
    routing,
  ],
  declarations: [
      LoginComponent
    ]
})
export class LoginModule { }
