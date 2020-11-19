import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunityRoutingModule } from './community-routing.module';
import { CommunityLandingComponent } from './community-landing.component';
import { MaterialModule } from '../shared/material.module';
import { BrowseQuestionsComponent } from './browse-questions/browse-questions.component';
import { BrowseByRootsComponent } from './browse-by-roots/browse-by-roots.component';
import { DateAgoQuesPipe } from './pipes/date-ago-ques.pipe';
import { CommNewQuestionComponent } from './comm-new-question/comm-new-question.component';
import { FormsModule } from '@angular/forms';
import { SelectQuesPathComponent } from './select-ques-path/select-ques-path.component';
import { QuesAnswerComponent } from './ques-answer/ques-answer.component';
import { EditorEditComponent } from './editor-edit/editor-edit.component';


@NgModule({
  declarations: [CommunityLandingComponent, BrowseQuestionsComponent, BrowseByRootsComponent, DateAgoQuesPipe, CommNewQuestionComponent, SelectQuesPathComponent, QuesAnswerComponent, EditorEditComponent],
  imports: [
    CommonModule,
    CommunityRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class CommunityModule { }
