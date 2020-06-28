import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { PasswordresetFormComponent } from './passwordreset-form/passwordreset-form.component';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { LoggerService } from '../services/logger.service';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    PasswordresetComponent,
    ActivateAccountComponent,
    PasswordresetFormComponent,
 ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
  ],
  providers: [LoggerService, AuthService, DataService],
})
export class AuthModule { }
