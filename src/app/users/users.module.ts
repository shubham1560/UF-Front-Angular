import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UserInfoComponent } from './user-info/user-info.component';
import { MaterialModule } from '../shared/material.module';
import { AuthoredArticlesComponent } from './authored-articles/authored-articles.component';



@NgModule({
  declarations: [UserInfoComponent, AuthoredArticlesComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialModule
  ]
})
export class UsersModule { }
