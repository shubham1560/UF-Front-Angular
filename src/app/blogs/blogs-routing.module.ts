import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleNewComponent } from './article-new/article-new.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { BlogsComponent } from './blogs.component';

const routes: Routes = [
    {path: 'blog/new', component: ArticleNewComponent},
    {path: 'blog/list', component: ArticleListComponent},
    {path: 'blog/selected', component: BlogsComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class BlogsRoutingModule{ }