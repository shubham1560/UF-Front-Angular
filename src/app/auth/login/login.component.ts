import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TokenObj } from '../data-models/Login'
import { AuthService } from 'src/app/services/authservice/auth.service';
import { CookieService } from 'ngx-cookie-service'
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';
import { Router } from '@angular/router';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider } from "angularx-social-login";
import { Title } from '@angular/platform-browser';


declare const gapi: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, AfterViewInit {

  // Form logic
  hide: boolean = true;
  loginForm: FormGroup;
  signingIn: boolean = false;
  signInFailure: boolean = false;
  response;
  error;
  errorMessage;
  isLoggedIn: boolean;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private cookieService: CookieService,
    private loggerService: LoggerService,
    private socialService: SocialAuthService,
    private titleService: Title
  ) { }

  signInWithFB(): void {
    this.signingIn = true;
    this.socialService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }


  signInWithGoogle(): void {
    this.signingIn = true;
  }

  ngOnInit() {
    this.titleService.setTitle("Sign in to SortedTree")
    this.socialService.authState.subscribe((user) => {
      var access_token = user.authToken;
      this.authService.login_facebook(access_token).subscribe(
        (result: any) => {
          this.cookieService.set('token', result.token);
          localStorage.setItem('token', result.token);
          if (localStorage.getItem("redirect_url")) {
            window.location.href = localStorage.getItem("redirect_url");
            window.location.reload();
          }else{
            window.location.href = "welcome";
          }
          this.signingIn = false;
        },
        error => {
          this.signingIn = false;
          this.errorMessage = "Some problem with your facebook account!"
        }
      )
      // this.loggedIn = (user != null);
    });

    this.isLoggedIn = this.authService.isLoggedIn();
    if (!this.isLoggedIn) {

      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]]
      })
      // this.testData();
    }
    this.loggerService.logData("auth-login", this);
  }

  login() {
    if (!this.isLoggedIn) {
      this.signingIn = true;
      this.authService.login_root(this.loginForm.value["email"], this.loginForm.value["password"]).subscribe(
        (response: TokenObj) => {
          this.response = response;
          this.signingIn = false;
          this.cookieService.set('token', response.token);
          localStorage.setItem('token', response.token);
          if (localStorage.getItem("redirect_url")) {
            window.location.href = localStorage.getItem("redirect_url");
            window.location.reload();
            window.location.href = "welcome";
          }
          // console.log("successfull");
          window.location.href = "welcome"
        },
        error => {
          this.errorMessage = error.error.message;
          this.error = error;
          this.signInFailure = true;
          this.signingIn = false;
        }
      )
    }
  }

  // testData() {
  //   // We can use setValue to set all the values in the form
  //   this.loginForm.patchValue({
  //     email: '',
  //   });
  // }


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
        this.signingIn = true;

        var access_token = googleUser.getAuthResponse().access_token;
        this.authService.login_google(access_token).subscribe(
          (response: TokenObj) => {
            this.cookieService.set('token', response.token);
            localStorage.setItem('token', response.token);
            // this.router.navigate(['/welcome']);
            // console.log("succesful login google");
            if (localStorage.getItem("redirect_url")) {
              window.location.href = localStorage.getItem("redirect_url");
            } else {
              window.location.href = "welcome";
            }
            this.signingIn = false;
          },
          error => {
            this.signingIn = false;
            this.errorMessage = "Some Problem with your google account!"
          }
        )
        //YOUR CODE HERE


      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

  ngAfterViewInit() {
    this.googleInit();
  }

}
