import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TokenObj } from '../data-models/Login'
import { AuthService } from 'src/app/services/authservice/auth.service';
import { CookieService } from 'ngx-cookie-service'
import { PasswordresetFormComponent } from '../passwordreset-form/passwordreset-form.component';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';
import { Router } from '@angular/router';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider } from "angularx-social-login";

declare const gapi: any;

@Component({
  selector: 'app-loginprompt',
  templateUrl: './loginprompt.component.html',
  styleUrls: ['./loginprompt.component.scss']
})
export class LoginpromptComponent implements OnInit {

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
    private router: Router,
    private socialService: SocialAuthService,
  ) { }

  signInWithFB(): void {
    this.signingIn = true;
    this.socialService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signInWithGoogle(): void {
    this.signingIn = true;
  }

  ngOnInit() {
    localStorage.setItem("redirect_url", window.location.href);
    this.socialService.authState.subscribe((user) => {
      var access_token = user.authToken;
      this.authService.login_facebook(access_token).subscribe(
        (result: any) => {

          // this.cookieService.set('token', result.token);
          localStorage.setItem('token', result.token);
          if (localStorage.getItem("redirect_url")) {
            window.location.href = localStorage.getItem("redirect_url");
            window.location.reload();
          }else{
            window.location.href = "welcome";
          }
          this.signingIn = false;

          // this.cookieService.set('token', result.token);
          // // this.router.navigate(['/welcome']);
          // // window.location.href = "welcome";
          // window.location.href = localStorage.getItem("redirect_url");
          // window.location.reload();
          // localStorage.clear();
          // this.signingIn = false;
        },
        error => {
          this.signingIn = false;
          this.errorMessage = "Problem signing in with your facebook account";
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
          // this.cookieService.set('token', response.token);
          localStorage.setItem('token', response.token);
          if (localStorage.getItem("redirect_url")) {
            window.location.href = localStorage.getItem("redirect_url");
            window.location.reload();
            // window.location.href = "welcome";
          }
          // console.log("successfull");
          // window.location.href = "welcome"

          // this.response = response;
          // this.signingIn = false;
          // this.cookieService.set('token', response.token);
          // this.router.navigate(['/welcome']);
          // window.location.href = "welcome"
          // window.location.href = localStorage.getItem("redirect_url");
          // window.location.reload()
          // localStorage.clear()
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
        var access_token = googleUser.getAuthResponse().access_token;
        this.authService.login_google(access_token).subscribe(
          (response: TokenObj) => {
            this.response = response;
            this.signingIn = false;
            // this.cookieService.set('token', response.token);
            localStorage.setItem('token', response.token);
            if (localStorage.getItem("redirect_url")) {
              window.location.href = localStorage.getItem("redirect_url");
              window.location.reload();
              // window.location.href = "welcome";
            }
            // console.log("successfull");
            // window.location.href = "welcome"
          },
          error => {
            this.signingIn = false;
            this.errorMessage = "Problem Signing in with your google account"
          }
        )
        //YOUR CODE HERE


      }, (error) => {
        this.signingIn = false;
        this.errorMessage = "User closed the login window, please try again"
        // alert(JSON.stringify(error, undefined, 2));
      });
  }

  ngAfterViewInit() {
    this.googleInit();
  }

}
