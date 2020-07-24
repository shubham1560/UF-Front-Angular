import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RootComponent } from './root/root.component';


const routes: Routes = [
  {
    path: '',
    component: RootComponent
  },
  {
    path: ':kb_base/:kb_category',
    component: RootComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TreeRoutingModule { }
