import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { CommentsComponent } from './comments/comments.component';
import { BlogsComponent } from '../blogs/blogs.component';
import { ArticleNewComponent } from './article-new/article-new.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BlogsRoutingModule } from './blogs-routing.module';



@NgModule({
  declarations: [ArticleListComponent, ArticleDetailComponent, CommentsComponent, BlogsComponent, ArticleNewComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BlogsRoutingModule,
  ]
})
export class BlogsModule { }
