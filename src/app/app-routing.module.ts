import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
// import { ArticleListComponent } from './blogs/article-list/article-list.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { LandingComponent } from './landing/landing.component';
import { AuthGuard } from './auth/guard/auth.guard';
import { ProfileGuard } from './userprofile/guard/profile.guard'


const routes: Routes = [
  { path: "welcome", redirectTo: "" },
  { path: "", component: LandingComponent },
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
  { path: "**", component: NotFoundComponent },
  { 
    path: "blogs", 
    loadChildren: () =>
      import("./blogs/blogs.module").then(bm=>bm.BlogsModule) 
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

