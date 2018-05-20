import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { HeaderComponent} from './header/header.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { SharedModule } from '../../shared/shared.module';
import { EditProfileDialogComponent } from './header/edit-profile-dialog.component';
@NgModule({
  imports: [
    RouterModule,
    SharedModule
  ],
  entryComponents: [EditProfileDialogComponent],
  declarations: [
    BreadcrumbComponent,
    HeaderComponent,
    LayoutComponent,
    EditProfileDialogComponent,
  ]
})
export class LayoutModule { }
