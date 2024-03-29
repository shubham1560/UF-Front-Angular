import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeRoutingModule } from './tree-routing.module';
import { MaterialModule } from '../shared/material.module';
import { RootComponent } from './root/root.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { CourseviewComponent } from './courseview/courseview.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { AddpathorbranchComponent } from './addpathorbranch/addpathorbranch.component'
// import { ReactiveFormsModule } from '@angular/forms';
import { OrderPathComponent } from './order-path/order-path.component';
import { AssignPathComponent } from './assign-path/assign-path.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RootComponent,
    BreadcrumbsComponent,
    CourseviewComponent,
    SideNavComponent,
    AddpathorbranchComponent,
    OrderPathComponent,
    AssignPathComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    TreeRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ],
})
export class TreeModule { }
