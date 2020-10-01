import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleNewComponent } from './article-new/article-new.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { BlogsComponent } from './blogs.component';
import { AuthorGuard } from './guard/author.guard'

const routes: Routes = [
    {
        path: '', 
        component: ArticleListComponent
    },
    {
        path: 'article/:id',
        // canActivate: [AuthorGuard],
        component: ArticleNewComponent
    },
    {
        path: ':category',
        component: BlogsComponent
    },
    
    {
        path: ':category/:article', 
        component: BlogsComponent
    },
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class BlogsRoutingModule{ }