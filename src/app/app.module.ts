import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { AuthService } from './services/authservice/auth.service';
import { DataService } from './services/knowledgeservice/knowledge.service';
import { LoggerService } from './services/cx-menu/realtimelogger.service';
import { LandingModule } from './landing/landing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent} from './shared/header/header.component'
import { UrlconfigService } from "./services/urlconfig.service"


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
    HeaderComponent,
  ],
  imports: [
    FlexLayoutModule,
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    // RouterModule.forRoot(routes, { useHash: true, preloadingStrategy: PreloadAllModules }),
    LandingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [LoggerService, AuthService, DataService, UrlconfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
