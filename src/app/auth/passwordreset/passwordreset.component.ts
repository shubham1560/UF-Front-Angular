import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.scss']
})
export class PasswordresetComponent implements OnInit {

  mailsent: boolean;
  message: string;

  resetForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService) { }

  ngOnInit() {
    this.mailsent = false;
    this.resetForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
    })
  }

  save() { 
    this.mailsent = true;
    this.authService.sendResetPassowordLink(this.resetForm.value["email"]).subscribe(
      response => {
        console.log(response);
        this.message = "Mail has been sent";
      },
      error => {
        console.log(error);
        this.message = "Mail couldn't be sent as the user doesn't exist";
        
      }
    ) ;
    // console.log(this.resetForm)
    // console.log(JSON.stringify(this.resetForm.value))
  }

}
