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
import { FollowComponent } from './follow/follow.component';
import { PersonalComponent } from './personal/personal.component';
import { CertificateComponent } from './certificate/certificate.component';
import { DiseaseDialogComponent } from './disease/disease-dialog/disease-dialog.component';
import { TreaterDialogComponent } from './treater/treater-dialog/treater-dialog.component';
import { DrugDialogComponent } from './drug/drug-dialog/drug-dialog.component';
import { RemedyDialogComponent } from './remedy/remedy-dialog/remedy-dialog.component';
import { FollowDialogComponent } from './follow/follow-dialog/follow-dialog.component';
import { PersonalDialogComponent } from './personal/personal-dialog/personal-dialog.component';
import { CertificateDialogComponent } from './certificate/certificate-dialog/certificate-dialog.component';



//service
import { DiseaseService } from '../shared/services/disease.service';
import { TreaterService } from '../shared/services/treater.service';
import { DrugService } from '../shared/services/drug.service';
import { TreatmentService } from '../shared/services/treatment.service';
import { RemedyComponent } from './remedy/remedy.component';
import { FollowService } from '../shared/services/follow.service';
import { PersonalService } from '../shared/services/personal.service';
import { CertificateService } from '../shared/services/certificate.service';


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
        FollowComponent,
        FollowDialogComponent,
        PersonalComponent,
        PersonalDialogComponent,
        CertificateComponent,
        CertificateDialogComponent

    ],
    //dialog
    entryComponents: [
        DiseaseDialogComponent,
        TreaterDialogComponent,
        DrugDialogComponent,
        RemedyDialogComponent,
        FollowDialogComponent,
        PersonalDialogComponent,
        CertificateDialogComponent

    ],
    providers: [
        DiseaseService,
        TreaterService,
        DrugService,
        TreatmentService,
        FollowService,
        PersonalService,
        CertificateService,



    ],
})
export class BasicDataModule {
}