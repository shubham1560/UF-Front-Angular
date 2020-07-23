import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RootComponent } from './root/root.component';


const routes: Routes = [
  {
    path: '',
    component: RootComponent
  },
  {
    path: ':knowledge_base',
    component: RootComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TreeRoutingModule { }
