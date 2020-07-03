import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'uf-front';
  showFiller = false;

  

  constructor(private route: ActivatedRoute,
              private authService: AuthService) {
              }

  

}
