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

import { DiseaseDialogComponent } from './disease/disease-dialog/disease-dialog.component';
import { TreaterDialogComponent } from './treater/treater-dialog/treater-dialog.component';
import { DrugDialogComponent } from './drug/drug-dialog/drug-dialog.component';
<<<<<<< HEAD
import { RemedyDialogComponent } from './remedy/remedy-dialog/remedy-dialog.component';

=======
import { FollowDialogComponent } from './follow/follow-dialog/follow-dialog.component';
import { PersonalDialogComponent } from './personal/personal-dialog/personal-dialog.component';
>>>>>>> 78f26e21abf12c14d0366712b5fbc907959789f9


//service
import { DiseaseService } from '../shared/services/disease.service';
import { TreaterService } from '../shared/services/treater.service';
import { DrugService } from '../shared/services/drug.service';
<<<<<<< HEAD
import { TreatmentService } from '../shared/services/treatment.service';
import { RemedyComponent } from './remedy/remedy.component';
=======
import { FollowService } from '../shared/services/follow.service';
import { PersonalService } from '../shared/services/personal.service';
>>>>>>> 78f26e21abf12c14d0366712b5fbc907959789f9


@NgModule({
    imports: [
        SharedModule,
        routing,
        MenuModule,
        HttpClientModule,
    ],
    //เขียน2ไฟล์(Component,Dialog)
    declarations: [
        BasicDataComponent,
        DiseaseComponent,
        DiseaseDialogComponent,
        TreaterComponent,
        TreaterDialogComponent,
        DrugComponent,
        DrugDialogComponent,
<<<<<<< HEAD
        RemedyComponent,
        RemedyDialogComponent
=======
        FollowComponent,
        FollowDialogComponent,
        PersonalComponent,
        PersonalDialogComponent
>>>>>>> 78f26e21abf12c14d0366712b5fbc907959789f9
    ],
    entryComponents: [
        DiseaseDialogComponent,
        TreaterDialogComponent,
        DrugDialogComponent,
<<<<<<< HEAD
        RemedyDialogComponent,
=======
        FollowDialogComponent,
        PersonalDialogComponent
>>>>>>> 78f26e21abf12c14d0366712b5fbc907959789f9
    ],
    providers: [
        DiseaseService,
        TreaterService,
        DrugService,
<<<<<<< HEAD
        TreatmentService,
        
=======
        FollowService,
        PersonalService
>>>>>>> 78f26e21abf12c14d0366712b5fbc907959789f9
    ],
})
export class BasicDataModule {
}