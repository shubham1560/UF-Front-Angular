import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupportComponent } from './support.component';
import { FeatureRequestComponent } from './feature-request/feature-request.component';
import { ReportDefectComponent } from './report-defect/report-defect.component';
import { TicketsComponent } from './tickets/tickets.component';
import { ProfileGuard } from '../userprofile/guard/profile.guard';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';
import { TicketFormComponent } from './ticket-form/ticket-form.component';
import { ResetPasswordLoggedInComponent } from './reset-password-logged-in/reset-password-logged-in.component';


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
  },
  {
    path: "tickets/:id/:type",
    component: TicketFormComponent
  },
  {
    path: "reset_password",
    component: ResetPasswordLoggedInComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportRoutingModule { }
