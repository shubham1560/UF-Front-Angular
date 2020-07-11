import { Component, OnInit, Inject } from '@angular/core';
import { UserprofileService } from 'src/app/services/userprofile/userprofile.service';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';
import { AuthService } from 'src/app/services/authservice/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private profile: UserprofileService,
    private loggerService: LoggerService,
  ) { }
  
  image :string;
  response:any = {};
  error: any = {};
  name: string;
  isLoading: boolean = true;

  ngOnInit(): void {
    this.profile.getUserData().subscribe(
      result =>{
        this.response = result;
        this.isLoading = false;
        this.image = this.response.user.profile_pic;
        this.name = this.response.user.first_name + " " + this.response.user.last_name;
      }, 
      error =>{
        this.error = error;
      }
    )
    this.loggerService.logData("uf_user_profile", this);

  }

  deleteUser(){
    // this.profile.deleteUser().subscribe(
    //   response =>{
    //     this.response = response;
    //     this.authService.logoutUser();
    //   },
    //   error=>{
    //     this.error = error;
    //   }
    // )
  }
}


