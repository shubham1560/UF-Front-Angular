import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommunityLandingComponent } from './community-landing.component';
import { CommNewQuestionComponent } from './comm-new-question/comm-new-question.component';
import { QuesAnswerComponent } from './ques-answer/ques-answer.component'


const routes: Routes = [
  {
    path: "",
    component: CommunityLandingComponent
  },
  {
    path:"new_question",
    component: CommNewQuestionComponent
  },
  {
    path:"sq_qa/:question_id/:question_title",
    component: QuesAnswerComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunityRoutingModule { }
