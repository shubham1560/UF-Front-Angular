import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/knowledge.service';
import { LoggerService } from '../services/cx-menu/realtimelogger.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [LoggerService, AuthService, DataService]
})
export class SharedModule { }
