import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/authservice/auth.service';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';

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

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private loggerService: LoggerService) { }

  ngOnInit() {
    this.resetForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
    })

    this.loggerService.logData("auth-passwordreset", this);
  }

  save() {
    this.sendingLink = true;
    this.disableButton = true
    this.authService.sendResetPassowordLink(this.resetForm.value["email"]).subscribe(
      response => {
        this.response = response;
        this.message = "Paswword reset link has been sent to this email id: " + this.resetForm.value["email"] + ". Please check your inbox for the link";
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
        if (!error.error["user_exist"]) {
          this.message = "User with this email id doesn't exist";
        }
        if (error.error["user_exist"] && !error.error["is_active"]){
          this.message = "The user has not activated his account yet, please activate your account";
        }
        if(error.error["user_exist"] && !error.error["token_exist"]){
          this.message = "This is a server error, and since it has occured now, it shall be solved within a day";
        }
        
      }
    );
  }

}
