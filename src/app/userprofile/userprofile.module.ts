import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { UserprofileRoutingModule } from './userprofile-routing.module';



@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    UserprofileRoutingModule,
  ]
})
export class UserprofileModule { }
