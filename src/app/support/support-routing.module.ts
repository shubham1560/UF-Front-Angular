import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupportComponent } from './support.component';
import { FeatureRequestComponent } from './feature-request/feature-request.component';


const routes: Routes = [
  {
    path: "",
    component: SupportComponent
  },
  {
    path: "feature_request",
    component: FeatureRequestComponent
  },
  {
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportRoutingModule { }
