import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { PasswordresetFormComponent } from './passwordreset-form/passwordreset-form.component';


const routes: Routes = [
    { path: "auth/login", component: LoginComponent },
    { path: "auth/register", component: RegisterComponent },
    { path: "auth/passwordreset", component: PasswordresetComponent },
    { path: "auth/activate/:token", component: ActivateAccountComponent },
    { path: "auth/passwordresetform/:token", component: PasswordresetFormComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }

