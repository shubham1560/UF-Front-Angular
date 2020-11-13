import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunityRoutingModule } from './community-routing.module';
import { CommunityLandingComponent } from './community-landing.component';
import { MaterialModule } from '../shared/material.module';
import { BrowseQuestionsComponent } from './browse-questions/browse-questions.component';


@NgModule({
  declarations: [CommunityLandingComponent, BrowseQuestionsComponent],
  imports: [
    CommonModule,
    CommunityRoutingModule,
    MaterialModule
  ]
})
export class CommunityModule { }
