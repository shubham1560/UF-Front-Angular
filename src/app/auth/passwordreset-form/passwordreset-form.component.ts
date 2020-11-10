import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/services/authservice/auth.service';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';

function passwordMatch(c: AbstractControl): { [key: string]: boolean } | null {
  const p1 = c.get('password');
  const p2 = c.get('confirm_password');

  if (p1.pristine || p2.pristine) {
    return null;
  }

  if (p1.value === p2.value) {
    return null;
  }

  return { 'match': true }
}

@Component({
  selector: 'app-passwordreset-form',
  templateUrl: './passwordreset-form.component.html',
  styleUrls: ['./passwordreset-form.component.scss']
})
export class PasswordresetFormComponent implements OnInit {

  icon: string;
  passwordResetForm: FormGroup;
  token: string;
  message: string;
  attempt: boolean = false;
  reset: boolean;
  response: any;
  error;
  reseting = false;
  username: string;
  routeSub: any;
  constructor(private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router, 
    private authService: AuthService,
    private loggerService: LoggerService
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


    this.route.paramMap.subscribe(
      params => {
        this.token = params.get('token');
      }

    )
    this.authService.token_valid(this.token).subscribe(
      (response:any) => {
        // console.log(response);
        this.username = response.username;
        this.response = response;
      }, error => {
        // console.log(error);
        this.error = error;
        this.attempt = true;
        this.reset = false;
        this.icon = "report_problem"
        if (!this.error.error["user_exist"]) {
          this.message = "This url is not valid for any user";
        }
        else if (!this.error.error["is_active"]) {
          this.message = "The user with this link has not yet activated their account. Please activate your account first";
        } else {
          this.message = "the url is invalid";
        }
      }
    )

    this.passwordResetForm = this.fb.group({
      passwordGroup: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirm_password: ['', [Validators.required, Validators.minLength(8)]]
      }, { validators: passwordMatch }),
    })

    this.loggerService.logData("auth-passwordresetform", this);
    // console.log(this);
  }

  resetPassword() {
    this.reseting = true;
    this.authService.resetPassword(this.token, this.passwordResetForm.get('passwordGroup.password').value).subscribe(
      response => {
        // console.log(response);
        this.icon = "verified_user";
        this.message = "the password has been changed for the user";
        this.reset = true;
        this.attempt = true;
        this.reseting = false;
      },
      error => {
        // console.log(error);
        this.icon = "report_problem"
        this.message = "the url is invalid"
        this.reset = false;
        this.attempt = true;
        this.reseting = false;
      }
    )
  }

}
