import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/authservice/auth.service';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';
import { Title } from '@angular/platform-browser';
import { Router, NavigationStart } from '@angular/router';


@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.scss']
})
export class PasswordresetComponent implements OnInit {

  mailsent: boolean = false;
  errorOccured: boolean = false;
  message: string;
  disableButton = false;
  sendingLink: boolean = false;
  response;
  error;
  resetForm: FormGroup;
  resendLinkButtonActive = false;
  routeSub: any;

  // message = "<b>shubhamsinha2050@gmail.com</b><br>We have e-mailed your password reset link!";


  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loggerService: LoggerService,
    private titleService: Title
  ) { }

  ngOnInit() {

    this.routeSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        (document.querySelector('app-footer') as HTMLElement).style.display = 'block';
        (document.querySelector('app-header') as HTMLElement).style.display = 'block';

      }
    });

    (document.querySelector('app-footer') as HTMLElement).style.display = 'none';
    (document.querySelector('app-header') as HTMLElement).style.display = 'none';

    this.resetForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
    })
    this.titleService.setTitle("Forgot your password? - SortedTree");
    this.loggerService.logData("auth-passwordreset", this);
  }

  save() {
    this.sendingLink = true;
    this.disableButton = true
    this.authService.sendResetPassowordLink(this.resetForm.value["email"]).subscribe(
      response => {
        this.response = response;
        this.message = "<b>" + this.resetForm.value["email"] + "</b> <br>We have e-mailed your password reset link!";
        this.sendingLink = false;
        this.errorOccured = false;
        this.mailsent = true;
      },
      error => {
        this.error = error;
        this.mailsent = false;
        this.disableButton = false;
        this.sendingLink = false;
        this.errorOccured = true;
        if (this.error.error.message && this.error.status == 405) {
          this.message = error.error.message;
        }
        else if (!error.error["user_exist"] && this.error.status == 404) {
          this.message = "User with this email id doesn't exist!";
        }
        else if (error.error.user_exist && !error.error.is_active) {
          this.message = "Please activate your account using the link you received when you registered!";
          this.resendLinkButtonActive = true;
        }
        else if (error.error["user_exist"] && !error.error["token_exist"]) {
          this.message = "This is a server error, we are working on it!";
        }
        
      }
    );
  }
  resendLink = false;
  resendActivationLink() {
    if (this.resetForm.valid) {
      this.resendLink = true;
      this.authService.resendActivationLink(this.resetForm.get('email').value).subscribe(
        (result: any) => {
          this.resendLink = false;
          // console.log(result);
          this.message = result.message;
        }, error => {
          this.resendLink = false;
          this.errorOccured = true;
          this.message = error.error.message;
        }
      )
    }
  }

}
