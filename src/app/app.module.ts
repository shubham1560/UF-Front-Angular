import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Router, PreloadAllModules } from '@angular/router'
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { FooterComponent } from './shared/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { BlogsModule } from './blogs/blogs.module';
import { AuthService } from './services/auth.service';
import { DataService } from './services/knowledge.service';
import { ArticleListComponent } from './blogs/article-list/article-list.component';
import { BlogsComponent } from './blogs/blogs.component';
import { LoggerService } from './services/cx-menu/realtimelogger.service';
import { LandingModule } from './landing/landing.module';

// var routes = [
//   { path: "", component: ArticleListComponent },
//   {
//     path: "auth",
//     loadChildren: () => 
//       import('././auth/auth.module').then(m => m.AuthModule)
//   },
//   { path: "**", component: NotFoundComponent },
//   { path: "blogs", component: BlogsComponent }

// ]


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    // RouterModule.forRoot(routes, { useHash: true, preloadingStrategy: PreloadAllModules }),
    LandingModule,
    BrowserAnimationsModule,
    BlogsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [LoggerService, AuthService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
