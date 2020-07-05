import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ArticleListComponent } from './blogs/article-list/article-list.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { BlogsComponent } from './blogs/blogs.component';


const routes: Routes = [
  { path: "", component: ArticleListComponent },
  {
    path: "auth",
    loadChildren: () =>
      import('././auth/auth.module').then(m => m.AuthModule)
  },
  { path: "**", component: NotFoundComponent },
  { path: "blogs", component: BlogsComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,  { useHash: true, preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

