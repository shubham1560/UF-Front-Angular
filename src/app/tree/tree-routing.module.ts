import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RootComponent } from './root/root.component';
import { OrderPathComponent } from './order-path/order-path.component';
import { AuthGuard } from '../auth/guard/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: RootComponent
  },
  {
    path:'path_order',
    component: OrderPathComponent
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
