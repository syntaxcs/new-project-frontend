import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MenuModule } from '../theme/menu/menu.module';
import { HttpClientModule } from '@angular/common/http';
import { routing } from './personal-data.routing';

//component
import { PersonalDataComponent } from './personal-data.component'
import { PersonalListComponent } from './personal-list/personal-list.component'
import { PhysicalComponent } from './personal-list/physical/physical.component';
import { GeneralComponent } from './personal-list/general/general.component';
import { SummaryComponent } from './personal-list/summary/summary.component';
import { EvalutionComponent } from './personal-list/evalution/evalution.component';
import { PersonalComponent } from './personal/personal.component';
import { FollowComponent } from './follow/follow.component';
import { CertificateComponent } from './certificate/certificate.component';
//dialog
import { PhysicalDialogComponent } from './personal-list/physical/physical-dialog/physical-dialog.component';
import { GeneralDialogComponent } from './personal-list/general/general-dialog/general-dialog.component';
import { SummaryDialogComponent } from './personal-list/summary/summary-dialog/summary-dialog.component';
import { EvalutionDialogComponent } from './personal-list/evalution/evalution-dialog/evalution-dialog.component';
import { PersonalDialogComponent } from './personal/personal-dialog/personal-dialog.component';
import { FollowDialogComponent } from './follow/follow-dialog/follow-dialog.component';
import { CertificateDialogComponent } from './certificate/certificate-dialog/certificate-dialog.component';
//service
import { PersonalService } from '../shared/services/personal.service';
import { PhysicalService } from '../shared/services/physical.service';
import { GeneralService } from '../shared/services/general.service';
import { SummaryService } from '../shared/services/summary.service';
import { EvalutionService } from '../shared/services/evalution.service';
import { FollowService } from '../shared/services/follow.service';
import { CertificateService } from '../shared/services/certificate.service';
import { DrugService } from '../shared/services/drug.service';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    routing,
    MenuModule,
    HttpClientModule,
  ],
  //เขียน2ไฟล์(component,dialog)
  declarations: [
    PersonalListComponent,
    PersonalDataComponent,
    PhysicalComponent,
    PhysicalDialogComponent,
    GeneralComponent,
    GeneralDialogComponent,
    SummaryComponent,
    SummaryDialogComponent,
    EvalutionComponent,
    EvalutionDialogComponent,
    PersonalComponent,
    PersonalDialogComponent,
    FollowComponent,
    FollowDialogComponent,
    CertificateComponent,
    CertificateDialogComponent
  ],
  //dialog
  entryComponents: [
    PhysicalDialogComponent,
    GeneralDialogComponent,
    SummaryDialogComponent,
    EvalutionDialogComponent,
    PersonalDialogComponent,
    FollowDialogComponent,
    CertificateDialogComponent
  ],
  providers: [
    PersonalService,
    PhysicalService,
    GeneralService,
    SummaryService,
    EvalutionService,
    FollowService,,
    CertificateService,
    DrugService
  ],
})
export class PersonalDataModule { }
