import { NgModule } from '@angular/core';
import { ButtonCardTitleComponent } from './button-card-title/button-card-title.component';
import { MaterialModule } from '../../../shared/material.module';
@NgModule({
  imports: [
    MaterialModule
  ],
  declarations: [
    ButtonCardTitleComponent
  ],
  exports: [
    ButtonCardTitleComponent
  ]
})
export class ButtonModule { }
