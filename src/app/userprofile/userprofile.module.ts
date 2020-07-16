import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { UserprofileRoutingModule } from './userprofile-routing.module';
import { UserprofileService } from '../services/userprofile/userprofile.service';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BookmarkedarticlesComponent } from './bookmarkedarticles/bookmarkedarticles.component';
import {MatTableModule, MatCellDef, MatRowDef} from '@angular/material/table';
import { DeleteusermodalComponent } from './deleteusermodal/deleteusermodal.component';


@NgModule({
  declarations: [ProfileComponent, BookmarkedarticlesComponent, DeleteusermodalComponent],
  imports: [
    CommonModule,
    UserprofileRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    MatTableModule,
  ],
  providers: [UserprofileService ,],
})
export class UserprofileModule { }
