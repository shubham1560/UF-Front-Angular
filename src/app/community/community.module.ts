import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunityRoutingModule } from './community-routing.module';
import { CommunityLandingComponent } from './community-landing.component';
import { MaterialModule } from '../shared/material.module';
import { BrowseQuestionsComponent } from './browse-questions/browse-questions.component';
import { BrowseByRootsComponent } from './browse-by-roots/browse-by-roots.component';


@NgModule({
  declarations: [CommunityLandingComponent, BrowseQuestionsComponent, BrowseByRootsComponent],
  imports: [
    CommonModule,
    CommunityRoutingModule,
    MaterialModule
  ]
})
export class CommunityModule { }
