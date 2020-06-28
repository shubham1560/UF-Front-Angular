import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TokenObj } from '../data-models/Login'
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service'
import { PasswordresetFormComponent } from '../passwordreset-form/passwordreset-form.component';

declare const gapi: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, AfterViewInit {

  // Form logic

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private cookieService: CookieService,
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(10)]]
    })
    this.testData();
  }

  login() {
    console.log(this.loginForm)
    console.log("Saved Working" + JSON.stringify(this.loginForm.value));
    console.log(this.loginForm.value["email"]);
    this.authService.login_root(this.loginForm.value["email"], this.loginForm.value["password"]).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    )
  }

  testData() {
    // We can use setValue to set all the values in the form
    this.loginForm.patchValue({
      email: '',
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

        var access_token = googleUser.getAuthResponse().access_token;
        this.authService.login_google(access_token).subscribe(
          (response: TokenObj) => {
            this.cookieService.set('token', response.token);
            console.log(response);
          },
          error => {
            console.log(error)
          }
        )
        //YOUR CODE HERE
        console.log(this.authService.isLoggedIn() ? "user is logged in" : "not logged in");


      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

  ngAfterViewInit() {
    this.googleInit();
  }

}
