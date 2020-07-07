import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { AllArticlesComponent } from './all-articles/all-articles.component';
import { LandingRoutingModule } from './landing-routing.module';
import { MaterialModule } from '../shared/material.module';
import { LoggerService } from '../services/cx-menu/realtimelogger.service';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/knowledge.service';
import { FooterComponent } from '../shared/footer/footer.component';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [LandingComponent, AllArticlesComponent, FooterComponent],
  imports: [
    CommonModule,
    LandingRoutingModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  exports:[LandingComponent, AllArticlesComponent, FooterComponent ],
  providers:[LoggerService, AuthService, DataService],
  bootstrap: [LandingComponent]
})
export class LandingModule { }
