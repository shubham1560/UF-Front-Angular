import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
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
  image = "https://urbanfraud-test.s3.amazonaws.com/article/featured_image_thumbs/jonathan-bowers-UZJ5ZpYzaLI-unsplash.jpg"
  isLoggedIn: boolean;
  user: any = {};
  error: any;
  constructor(private route: ActivatedRoute,
    private authService: AuthService,
    private loggerService: LoggerService) { }


  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    if(this.isLoggedIn){
      this.authService.getLoggedInUserDetail().subscribe(
        (response:any) => {
          this.user = response.user;
          
        },
        error =>{
          this.error = error;
        }
      )
    }

    this.loggerService.logData('header', this);

  }

  logout(){
    this.authService.logoutUser();
    window.window.location.href = "welcome";
  }

}
