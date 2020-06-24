import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, PasswordresetComponent, ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
  ]
})
export class AuthModule { }
