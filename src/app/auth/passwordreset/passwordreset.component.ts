import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
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
        console.log(response);
        this.message = "Mail has been sent to: "+this.resetForm.value["email"] +". Please check your inbox for the link";
        this.sendingLink = false;
        this.errorOccured = false;
        this.mailsent = true;
      },
      error => {
        console.log(error);
        this.mailsent = false;
        this.disableButton = false;
        this.sendingLink = false;
        this.errorOccured = true;
        this.message = "Mail couldn't be sent as the user with this email id doesn't exist";
        
      }
    ) ;
  }

}
