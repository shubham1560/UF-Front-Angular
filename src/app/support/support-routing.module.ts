import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupportComponent } from './support.component';
import { FeatureRequestComponent } from './feature-request/feature-request.component';
import { ReportDefectComponent } from './report-defect/report-defect.component';


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
    path: "report_defect",
    component: ReportDefectComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportRoutingModule { }
