import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MenuModule } from '../theme/menu/menu.module';
import { HttpClientModule } from '@angular/common/http';
import { routing } from './basic-data.routing';

import { BasicDataComponent } from './basic-data.component';
import { DiseaseComponent } from './disease/disease.component';
import { DiseaseDialogComponent } from './disease/disease-dialog/disease-dialog.component';
@NgModule({
    imports: [
        SharedModule,
        routing,
        MenuModule,
        HttpClientModule,
    ],
    declarations: [
        BasicDataComponent,
        DiseaseComponent,
        DiseaseDialogComponent
    ],
    entryComponents: [
        DiseaseDialogComponent
    ],
    providers: [

    ],
})
export class BasicDataModule {
}