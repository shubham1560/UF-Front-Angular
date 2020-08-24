import { NgModule } from "@angular/core";
import {Routes, RouterModule} from '@angular/router'
import { LandingComponent } from './landing.component';
import { ExplorerootsComponent } from './exploreroots/exploreroots.component';


const routes: Routes = [
    {
        path:"",
        component: ExplorerootsComponent
        // component: LandingComponent
    },
    {
        path:"dashboard",
        component: LandingComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LandingRoutingModule{}