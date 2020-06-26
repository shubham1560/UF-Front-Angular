import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { CommentsComponent } from './comments/comments.component';
import { BlogsComponent } from '../blogs/blogs.component';



@NgModule({
  declarations: [ArticleListComponent, ArticleDetailComponent, CommentsComponent, BlogsComponent],
  imports: [
    CommonModule
  ]
})
export class BlogsModule { }
