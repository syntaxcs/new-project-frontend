import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MenuModule } from '../theme/menu/menu.module';
import { HttpClientModule } from '@angular/common/http';
import { routing } from './basic-data.routing';

//component
import { BasicDataComponent } from './basic-data.component';
import { DiseaseComponent } from './disease/disease.component';
import { TreaterComponent } from './treater/treater.component';
import { DrugComponent } from './drug/drug.component';
import { DiseaseDialogComponent } from './disease/disease-dialog/disease-dialog.component';
import { TreaterDialogComponent } from './treater/treater-dialog/treater-dialog.component';
import { DrugDialogComponent } from './drug/drug-dialog/drug-dialog.component';


//service
import { DiseaseService } from '../shared/services/disease.service'; 
import { TreaterService } from '../shared/services/treater.service';
import { DrugService } from '../shared/services/drug.service';

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
        DiseaseDialogComponent,
        TreaterComponent,
        TreaterDialogComponent,
        DrugComponent,
        DrugDialogComponent
    ],
    entryComponents: [
        DiseaseDialogComponent,
        TreaterDialogComponent,
        DrugDialogComponent
    ],
    providers: [
        DiseaseService,
        TreaterService,
        DrugService
    ],
})
export class BasicDataModule {
}