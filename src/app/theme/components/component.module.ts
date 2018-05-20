import { InputModule } from './input-text/input-text.module';
import { NgModule } from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';
import { ButtonModule } from './button/button.module';
import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog/confirm-delete-dialog.component';
import { MaterialModule } from '../../shared/material.module';

@NgModule({
  imports: [
    ButtonModule,
    MaterialModule
  ],
  declarations: [
    DialogComponent,
    ConfirmDeleteDialogComponent,
  ],
  exports: [
    ButtonModule,
    DialogComponent,
    InputModule,
    ConfirmDeleteDialogComponent,
  ],
  entryComponents: [
    ConfirmDeleteDialogComponent,
  ],
})
export class ComponentsModule { }