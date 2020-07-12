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



@NgModule({
  declarations: [ArticleListComponent, ArticleDetailComponent, CommentsComponent, BlogsComponent, ArticleNewComponent, SeecommentsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BlogsRoutingModule,
  ],
  providers: [LoggerService, AuthService, DataService],
})
export class BlogsModule { }
