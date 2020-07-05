import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { AllArticlesComponent } from './all-articles/all-articles.component';



@NgModule({
  declarations: [LandingComponent, AllArticlesComponent],
  imports: [
    CommonModule
  ]
})
export class LandingModule { }
