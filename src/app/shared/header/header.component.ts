import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authservice/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: any;
  user: any = {};
  error: any;
  image = "";

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      console.log("calling func");
      this.authService.getLoggedInUserDetail().subscribe(
        (response: any) => {
          this.user = response.user;
          console.log(this.user);
          if (this.user.profile_pic) {
            this.image = this.user.profile_pic;
          }
          if (this.user.profile) {
            this.image = this.user.profile;
          }
        },
        error => {
          this.error = error;
        }
      )
    }
  }

  logout() {
    this.authService.logoutUser();
  }


}
