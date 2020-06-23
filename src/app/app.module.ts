import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Router } from '@angular/router'
import { LoginComponent } from './auth/login/login.component';
import { AuthModule } from './auth/auth.module';
import { NotFoundComponent } from './not-found/not-found.component'


var routes = [
  { path: "", component: LoginComponent },
  { path: "login", component: LoginComponent },
  {path : "**", component: NotFoundComponent}
  
]


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
