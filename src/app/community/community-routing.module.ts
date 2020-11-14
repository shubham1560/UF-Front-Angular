import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommunityLandingComponent } from './community-landing.component';
import { CommNewQuestionComponent } from './comm-new-question/comm-new-question.component';


const routes: Routes = [
  {
    path: "",
    component: CommunityLandingComponent
  },
  {
    path:"new_question",
    component: CommNewQuestionComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunityRoutingModule { }
