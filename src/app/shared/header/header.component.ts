import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: any;
  user:any ={};
  error:any;
  image = "https://urbanfraud-test.s3.amazonaws.com/article/featured_image_thumbs/jonathan-bowers-UZJ5ZpYzaLI-unsplash.jpg"

  constructor(
    private authService : AuthService,
  ) { }

  ngOnInit(): void {
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
  }

  logout(){
    this.authService.logoutUser();
  }


}
