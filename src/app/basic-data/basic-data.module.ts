import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MenuModule } from '../theme/menu/menu.module';
import { HttpClientModule } from '@angular/common/http';
import { routing } from './basic-data.routing';


//component-Dialog
import { BasicDataComponent } from './basic-data.component';
import { DiseaseComponent } from './disease/disease.component';
import { TreaterComponent } from './treater/treater.component';
import { DrugComponent } from './drug/drug.component';
import { OfficerComponent } from './officer/officer.component';
import { RemedyComponent } from './remedy/remedy.component';
import { DiseaseDialogComponent } from './disease/disease-dialog/disease-dialog.component';
import { TreaterDialogComponent } from './treater/treater-dialog/treater-dialog.component';
import { DrugDialogComponent } from './drug/drug-dialog/drug-dialog.component';
import { RemedyDialogComponent } from './remedy/remedy-dialog/remedy-dialog.component';
import { OfficerDialogComponent } from './officer/officer-dialog/officer-dialog.component';

//service
import { DiseaseService } from '../shared/services/disease.service';
import { TreaterService } from '../shared/services/treater.service';
import { DrugService } from '../shared/services/drug.service';
import { TreatmentService } from '../shared/services/treatment.service';
import { OfficerService} from '../shared/services/officer.service';
import { from } from 'rxjs/internal/observable/from';
 


@NgModule({
    imports: [
        SharedModule,
        routing,
        MenuModule,
        HttpClientModule,
       
    ],
    //(Component,dialog)
    declarations: [
        BasicDataComponent,
        DiseaseComponent,
        DiseaseDialogComponent,
        TreaterComponent,
        TreaterDialogComponent,
        DrugComponent,
        DrugDialogComponent,
        RemedyComponent,
        RemedyDialogComponent,
        OfficerComponent,
        OfficerDialogComponent,
    ],
    //dialog
    entryComponents: [
        DiseaseDialogComponent,
        TreaterDialogComponent,
        DrugDialogComponent,
        RemedyDialogComponent,
        OfficerDialogComponent,
    ],
    providers: [
        DiseaseService,
        TreaterService,
        DrugService,
        TreatmentService,
        OfficerService
    ],
})
export class BasicDataModule {
}