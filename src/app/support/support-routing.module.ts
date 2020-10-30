import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupportComponent } from './support.component';
import { FeatureRequestComponent } from './feature-request/feature-request.component';
import { ReportDefectComponent } from './report-defect/report-defect.component';
import { TicketsComponent } from './tickets/tickets.component';
import { ProfileGuard } from '../userprofile/guard/profile.guard';


const routes: Routes = [
  {
    path: "",
    component: SupportComponent
  },
  {
    path: "feature_request",
    // canActivate: [ProfileGuard],
    component: FeatureRequestComponent
  },
  {
    path: "report_defect",
    // canActivate: [ProfileGuard],
    component: ReportDefectComponent
  },
  {
    path: "tickets",
    // canActivate: [ProfileGuard],
    component: TicketsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportRoutingModule { }
