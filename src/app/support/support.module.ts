import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupportRoutingModule } from './support-routing.module';
import { FeatureRequestComponent } from './feature-request/feature-request.component';
import { SupportComponent } from './support.component';
import { MaterialModule } from '../shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteAttachmentComponent } from './delete-attachment/delete-attachment.component';
import { EditNameComponent } from './edit-name/edit-name.component';

// import { DateAgoPipe } from '../shared/pipes/date-ago.pipe';



@NgModule({
  declarations: [FeatureRequestComponent, 
    SupportComponent, DeleteAttachmentComponent, EditNameComponent, 
    // DateAgoPipe
  ],
  imports: [
    CommonModule,
    SupportRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class SupportModule { }
