import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { AuthoredArticlesComponent } from './authored-articles/authored-articles.component';


const routes: Routes= [
    {
        path: "",
        component: ProfileComponent,

    },
    {
        path: "authored_articles",
        component: AuthoredArticlesComponent,
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserprofileRoutingModule { }