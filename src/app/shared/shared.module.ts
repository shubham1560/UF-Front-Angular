import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/knowledge.service';
import { LoggerService } from '../services/cx-menu/realtimelogger.service';
import { HeaderComponent } from './header/header.component';
import {MaterialModule} from './material.module'


@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    MaterialModule,

  ],
  providers: [LoggerService, AuthService, DataService]
})
export class SharedModule { }
