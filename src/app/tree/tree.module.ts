import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TreeRoutingModule } from './tree-routing.module';
import { RootComponent } from './root/root.component';
import {NgxGraphModule } from '@swimlane/ngx-graph';


@NgModule({
  declarations: [RootComponent],
  imports: [
    CommonModule,
    TreeRoutingModule,
    NgxGraphModule,
  ]
})
export class TreeModule { }
