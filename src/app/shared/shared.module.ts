import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/authservice/auth.service';
import { DataService } from '../services/knowledgeservice/knowledge.service';
import { LoggerService } from '../services/cx-menu/realtimelogger.service';
import { HeaderComponent } from './header/header.component';
import {MaterialModule} from './material.module';
import { LoginpromptComponent } from './loginprompt/loginprompt.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [HeaderComponent, LoginpromptComponent,],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [LoggerService, AuthService, DataService]
})
export class SharedModule { }
