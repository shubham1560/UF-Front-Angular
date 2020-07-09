import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './services/authservice/auth.service';
import { Observable } from 'rxjs';
import { slideInAnimation } from './app.animation';
import { LoggerService } from './services/cx-menu/realtimelogger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation],
})
export class AppComponent implements OnInit {
  title = 'uf-front';
  
  constructor() { }


  ngOnInit() {
    
  }

}
