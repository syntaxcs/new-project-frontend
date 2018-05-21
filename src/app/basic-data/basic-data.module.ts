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
import { DiseaseDialogComponent } from './disease/disease-dialog/disease-dialog.component';
<<<<<<< HEAD
import { TreaterDialogComponent } from './treater/treater-dialog/treater-dialog.component';

=======



//service
import { DiseaseService } from '../shared/services/disease.service'; 
>>>>>>> aeb5c687eea67ea08faa42427c1096358d7b25dd
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
        TreaterDialogComponent
    ],
    entryComponents: [
        DiseaseDialogComponent,
        TreaterDialogComponent
    ],
    providers: [
        DiseaseService
    ],
})
export class BasicDataModule {
}