import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupportRoutingModule } from './support-routing.module';
import { FeatureRequestComponent } from './feature-request/feature-request.component';
import { SupportComponent } from './support.component';
import { MaterialModule } from '../shared/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DeleteAttachmentComponent } from './delete-attachment/delete-attachment.component';
import { EditNameComponent } from './edit-name/edit-name.component';
import { ReportDefectComponent } from './report-defect/report-defect.component';
import { TicketsComponent } from './tickets/tickets.component';
import { TimesAgoPipe } from './pipes/times-ago.pipe';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';
import { TicketConversationComponent } from './ticket-conversation/ticket-conversation.component';
import { TicketFormComponent } from './ticket-form/ticket-form.component';
import { AttachmentsComponent } from './attachments/attachments.component';
import { UpdateTicketDetailsComponent } from './update-ticket-details/update-ticket-details.component';

// import { DateAgoPipe } from '../shared/pipes/date-ago.pipe';



@NgModule({
  declarations: [FeatureRequestComponent, 
    SupportComponent, DeleteAttachmentComponent, EditNameComponent, ReportDefectComponent, TicketsComponent, TimesAgoPipe, TicketDetailComponent, TicketConversationComponent, TicketFormComponent, AttachmentsComponent, UpdateTicketDetailsComponent, 
  ],
  imports: [
    CommonModule,
    SupportRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SupportModule { }
