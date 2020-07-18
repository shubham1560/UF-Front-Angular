import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TreeRoutingModule } from './tree-routing.module';
import { RootComponent } from './root/root.component';


@NgModule({
  declarations: [RootComponent],
  imports: [
    CommonModule,
    TreeRoutingModule,
  ]
})
export class TreeModule { }
