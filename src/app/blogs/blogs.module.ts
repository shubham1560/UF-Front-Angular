import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { CommentsComponent } from './comments/comments.component';
import { BlogsComponent } from '../blogs/blogs.component';
import { ArticleNewComponent } from './article-new/article-new.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BlogsRoutingModule } from './blogs-routing.module';
import { LoggerService } from '../services/cx-menu/realtimelogger.service';
import { AuthService } from '../services/authservice/auth.service';
import { DataService } from '../services/knowledgeservice/knowledge.service';
import { SeecommentsComponent } from './seecomments/seecomments.component';
import { MaterialModule } from '../shared/material.module';
import { FooterComponent } from '../shared/footer/footer.component';
import { KbuseComponent } from './kbuse/kbuse.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { SafeurlPipe } from './pipes/safeurl.pipe';
import { CoursesComponent } from './courses/courses.component';
import { FormsModule } from '@angular/forms';
import { PathbuilderComponent } from './pathbuilder/pathbuilder.component';
import { ArticleTagComponent } from './article-tag/article-tag.component';
import { StriphtmlPipe } from './pipes/strip/striphtml.pipe';
import { UsingTheEditorComponent } from './using-the-editor/using-the-editor.component';
import { ArticlesNavComponent } from './articles-nav/articles-nav.component';
import { DeleteArticleComponent } from './delete-article/delete-article.component';


@NgModule({
  declarations: [
    ArticleListComponent,
    ArticleDetailComponent, 
    CommentsComponent, 
    BlogsComponent, 
    ArticleNewComponent, 
    SeecommentsComponent,
    // FooterComponent,
    KbuseComponent,
    FeedbackComponent,
    SafeurlPipe,
    CoursesComponent,
    PathbuilderComponent,
    ArticleTagComponent,
    StriphtmlPipe,
    UsingTheEditorComponent,
    ArticlesNavComponent,
    DeleteArticleComponent,
    ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BlogsRoutingModule,
    MaterialModule,
    FormsModule
  ],
  providers: [LoggerService, AuthService, DataService],
})
export class BlogsModule { }
