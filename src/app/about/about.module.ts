import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { WhoWeAreComponent } from './who-we-are/who-we-are.component';
import { WhatMattersComponent } from './what-matters/what-matters.component';
import { WhatWeDoComponent } from './what-we-do/what-we-do.component';
import { HowWeDoItComponent } from './how-we-do-it/how-we-do-it.component';
import { AboutUsComponent } from './about-us.component';


@NgModule({
  declarations: [WhoWeAreComponent, WhatMattersComponent, WhatWeDoComponent, HowWeDoItComponent, AboutUsComponent],
  imports: [
    CommonModule,
    AboutRoutingModule
  ]
})
export class AboutModule { }
