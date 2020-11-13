import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunityRoutingModule } from './community-routing.module';
import { CommunityLandingComponent } from './community-landing.component';
import { MaterialModule } from '../shared/material.module';


@NgModule({
  declarations: [CommunityLandingComponent],
  imports: [
    CommonModule,
    CommunityRoutingModule,
    MaterialModule
  ]
})
export class CommunityModule { }
