import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupportRoutingModule } from './support-routing.module';
import { FeatureRequestComponent } from './feature-request/feature-request.component';
import { SupportComponent } from './support.component';


@NgModule({
  declarations: [FeatureRequestComponent, SupportComponent],
  imports: [
    CommonModule,
    SupportRoutingModule
  ]
})
export class SupportModule { }
