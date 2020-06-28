import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Router } from '@angular/router'
import { AuthModule } from './auth/auth.module';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { FooterComponent } from './shared/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoggerService } from './services/logger.service';
import { BlogsModule } from './blogs/blogs.module';
import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';

var routes = [
  { path: "", component: NotFoundComponent },
  { path: "**", component: NotFoundComponent },

]


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    AppRoutingModule,
    RouterModule.forRoot(routes, { useHash: true }),
    AuthModule,
    BrowserAnimationsModule,
    BlogsModule,
    HttpClientModule,
  ],
  providers: [LoggerService, AuthService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
