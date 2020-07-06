import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { AllArticlesComponent } from './all-articles/all-articles.component';
import { LandingRoutingModule } from './landing-routing.module';
import { MaterialModule } from '../shared/material.module';
import { LoggerService } from '../services/cx-menu/realtimelogger.service';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/knowledge.service';



@NgModule({
  declarations: [LandingComponent, AllArticlesComponent],
  imports: [
    CommonModule,
    LandingRoutingModule,
    MaterialModule,
  ],
  exports:[LandingComponent, AllArticlesComponent ],
  providers:[LoggerService, AuthService, DataService],
  bootstrap: [LandingComponent]
})
export class LandingModule { }
