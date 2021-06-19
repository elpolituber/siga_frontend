import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {DataViewModule} from 'primeng/dataview';
import {PanelModule} from 'primeng/panel';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {CalendarModule} from 'primeng/calendar';
import {AccordionModule} from 'primeng/accordion';
import {ListboxModule} from 'primeng/listbox';
import {MultiSelectModule} from 'primeng/multiselect';
import {FileUploadModule} from 'primeng/fileupload';
import {TableModule} from 'primeng/table';
import {StepsModule} from 'primeng/steps';
import {DialogModule} from 'primeng/dialog';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {SplitButtonModule} from 'primeng/splitbutton';
import {ToastModule} from 'primeng/toast';
import {CascadeSelectModule} from 'primeng/cascadeselect';

import { from } from 'rxjs';

// COMPONENTES
import { FormRoutes } from './form.routing';
import { ProjectInfoComponent } from './project-Info/project-info.component';
import { FormsComponent } from './form.component';
import { AcademicStatusComponent } from './academic-status/academic-status.component';
import { BeneficiaryInstitutionComponent } from './beneficiary-institution/beneficiary-institution.component';
import { ContextualizationComponent } from './contextualization/contextualization.component';
import { ParticipantsComponent } from './participants/participants.component';
import { ActivitiesComponent } from './activities/activities.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { ObservationsComponent } from './observations/observations.component'
import {CommunityService} from '../../../services/community/community.service';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(FormRoutes),
        DataViewModule,
        PanelModule,
        InputTextModule,
        ButtonModule,
        TabViewModule,
        DropdownModule,
        FormsModule,
        RadioButtonModule,
        InputTextareaModule,
        CalendarModule,
        AccordionModule,
        ListboxModule,
        MultiSelectModule,
        TableModule,
        FileUploadModule,
        StepsModule,
        DialogModule,
        AutoCompleteModule,
        ReactiveFormsModule,
        SplitButtonModule,
        ToastModule,
        CascadeSelectModule
    ],
    declarations: [
        ProjectInfoComponent,
        FormsComponent,
        AcademicStatusComponent,
        BeneficiaryInstitutionComponent,
        ContextualizationComponent,
        ParticipantsComponent,
        ActivitiesComponent,
        SchedulesComponent,
        ObservationsComponent,
    ],
    providers: [],
})
export class FormModule {
}
