import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { UserprofileRoutingModule } from './userprofile-routing.module';
import { UserprofileService } from '../services/userprofile/userprofile.service';



@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    UserprofileRoutingModule,
  ],
  providers: [UserprofileService ,],
})
export class UserprofileModule { }
