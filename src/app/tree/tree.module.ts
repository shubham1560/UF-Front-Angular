import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeRoutingModule } from './tree-routing.module';
import { MaterialModule } from '../shared/material.module';
import { RootComponent } from './root/root.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component'


@NgModule({
  declarations: [
    RootComponent,
    BreadcrumbsComponent,
  ],
  imports: [
    CommonModule,
    TreeRoutingModule,
    MaterialModule,
  ]
})
export class TreeModule { }
