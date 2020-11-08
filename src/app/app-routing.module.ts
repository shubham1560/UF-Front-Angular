import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules, NoPreloading } from '@angular/router';
// import { ArticleListComponent } from './blogs/article-list/article-list.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { LandingComponent } from './landing/landing.component';
import { AuthGuard } from './auth/guard/auth.guard';
import { ProfileGuard } from './userprofile/guard/profile.guard'
import { ExplorerootsComponent } from './landing/exploreroots/exploreroots.component';


const routes: Routes = [
  { path: "welcome", redirectTo: "" },
  { 
    path: "", 
    component: ExplorerootsComponent 
  },
  {
    path: "dashboard",
    component: LandingComponent
  },
  {
    path: "auth",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('././auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: "user_profile",
    canActivate: [ProfileGuard],
    loadChildren: () =>
      import("./userprofile/userprofile.module").then(up => up.UserprofileModule)
  },
  {
    path: "support",
    loadChildren: ()=>
      import('./support/support.module').then(sp=>sp.SupportModule)
  },
  { 
    path: "path", 
    loadChildren: () =>
      import("./blogs/blogs.module").then(bm=>bm.BlogsModule) 
  },
  {
    path: "roots",
    loadChildren: () =>
      import("./tree/tree.module").then(root=>root.TreeModule)
  },
  {
    path: "author",
    loadChildren: () => 
      import("./author/author.module").then(author=>author.AuthorModule)
  },
  {
    path: "about_us",
    loadChildren: ()=>
      import("./about/about.module").then(about=>about.AboutModule)
  },
  {
    path: "user",
    loadChildren: ()=>
      import("./users/users.module").then(users=>users.UsersModule)
  },
  { 
    path: "**", 
    component: NotFoundComponent 
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false, preloadingStrategy: NoPreloading })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

