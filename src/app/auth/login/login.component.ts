import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { LoginUser, TokenObj } from '../data-models/Login'
import {MatDialogModule} from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, AfterViewInit {

  // Form logic

  loginForm: FormGroup;

  constructor( private fb: FormBuilder,
               private authService: AuthService,
               private cookieService: CookieService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(10)]]      
    })

    // this.loginForm = new FormGroup(
    //   {
    //     email: new FormControl(),
    //     password: new FormControl()
    //   }
    // )
    this.testData();
  }

  login() {
    console.log(this.loginForm)
    console.log("Saved Working" + JSON.stringify(this.loginForm.value));
  }

  testData(){
    // We can use setValue to set all the values in the form
    this.loginForm.patchValue({
      email: 'shubhamsinha2050@gmail.com',
    });
  }


  // Google button logic
  public auth2: any;
  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '858132682646-5tacv1knc5ujr15omjrhcm4gnv49mat7.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('googleBtn'));
    });
  }
  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {

        this.authService.login_user_google(googleUser.wc.access_token).subscribe(
          (result: TokenObj)=> { 
            this.cookieService.set("token", result.token);
            console.log(this.cookieService);
          },
          error => {
            console.log(error);
          }
        )

      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

  ngAfterViewInit() {
    this.googleInit();
  }

}
