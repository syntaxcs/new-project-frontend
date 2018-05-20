import { NgModule } from '@angular/core';
import { ComponentsModule } from './components/component.module';
@NgModule({
  exports: [
    ComponentsModule,
  ]
})
export class ThemeModule { }