import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { AllArticlesComponent } from './all-articles/all-articles.component';
import { LandingRoutingModule } from './landing-routing.module';
import { MaterialModule } from '../shared/material.module';
import { LoggerService } from '../services/cx-menu/realtimelogger.service';
import { AuthService } from '../services/authservice/auth.service';
import { DataService } from '../services/knowledgeservice/knowledge.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FeaturedComponent } from './featured/featured.component';
import { ExplorerootsComponent } from './exploreroots/exploreroots.component';
import { ReadArticlesComponent } from './read-articles/read-articles.component';
import { RecentlyViewedComponent } from './recently-viewed/recently-viewed.component';
import { DateAgoPipe } from '../shared/pipes/date-ago.pipe';
import { ContinueCoursesComponent } from './continue-courses/continue-courses.component';
import { BookmarkedComponent } from './bookmarked/bookmarked.component';
import { QuotesComponent } from './quotes/quotes.component';


@NgModule({
  declarations: [LandingComponent, 
    AllArticlesComponent, 
    FeaturedComponent, 
    ExplorerootsComponent, 
    ReadArticlesComponent, 
    RecentlyViewedComponent, 
    DateAgoPipe, 
    ContinueCoursesComponent, BookmarkedComponent, QuotesComponent,
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    InfiniteScrollModule,
  ],
  exports:[LandingComponent, AllArticlesComponent,],
  providers:[LoggerService, AuthService, DataService],
  bootstrap: [LandingComponent]
})
export class LandingModule { }
