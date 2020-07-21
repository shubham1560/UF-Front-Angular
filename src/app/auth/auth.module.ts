import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { PasswordresetFormComponent } from './passwordreset-form/passwordreset-form.component';
import { AuthService } from '../services/authservice/auth.service';
import { DataService } from '../services/knowledgeservice/knowledge.service';
import { LoggerService } from '../services/cx-menu/realtimelogger.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MaterialModule } from '../shared/material.module';
import { LoginpromptComponent } from './loginprompt/loginprompt.component';
import { SocialAuthService } from "angularx-social-login";
import { RightpanelComponent } from './rightpanel/rightpanel.component';
 



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    PasswordresetComponent,
    ActivateAccountComponent,
    PasswordresetFormComponent,
    LoginpromptComponent,
    RightpanelComponent,
 ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    MatFormFieldModule,
    MaterialModule,
  ],
  providers: [LoggerService, AuthService, DataService, SocialAuthService],
})
export class AuthModule { }
