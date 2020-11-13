import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommunityLandingComponent } from './community-landing.component';


const routes: Routes = [
  {
    path: "",
    component: CommunityLandingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunityRoutingModule { }
