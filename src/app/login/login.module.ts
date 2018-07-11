import { NgModule } from '@angular/core';

import { LoginComponent } from './login.component';
import { routing } from './login.routing';
import { SharedModule } from '../shared/shared.module';
import { UserService } from '../shared/services/user.service'
@NgModule({
    imports: [
        SharedModule,
        routing
    ],
    declarations: [
        LoginComponent
    ],
    providers: [
        UserService
    ]
})
export class LoginModule { }