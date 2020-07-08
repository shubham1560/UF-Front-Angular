import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
import { slideInAnimation } from './app.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation],
})
export class AppComponent implements OnInit {
  title = 'uf-front';

  isLoggedIn: boolean;

  constructor(private route: ActivatedRoute,
    private authService: AuthService,) { }


  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  logout(){
    this.authService.logoutUser();
    window.window.location.href = "welcome";
  }

}
