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
    path: "courses", 
    loadChildren: () =>
      import("./blogs/blogs.module").then(bm=>bm.BlogsModule) 
  },
  {
    path: "roots",
    loadChildren: () =>
      import("./tree/tree.module").then(root=>root.TreeModule)
  },
  {
    path: "about_us",
    loadChildren: ()=>
      import("./about/about.module").then(about=>about.AboutModule)
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

