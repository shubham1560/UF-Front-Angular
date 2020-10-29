import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupportRoutingModule } from './support-routing.module';
import { FeatureRequestComponent } from './feature-request/feature-request.component';
import { SupportComponent } from './support.component';
import { MaterialModule } from '../shared/material.module';


@NgModule({
  declarations: [FeatureRequestComponent, SupportComponent],
  imports: [
    CommonModule,
    SupportRoutingModule,
    MaterialModule
  ]
})
export class SupportModule { }
