import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupportRoutingModule } from './support-routing.module';
import { FeatureRequestComponent } from './feature-request/feature-request.component';


@NgModule({
  declarations: [FeatureRequestComponent],
  imports: [
    CommonModule,
    SupportRoutingModule
  ]
})
export class SupportModule { }
