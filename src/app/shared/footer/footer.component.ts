import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';
import { UserprofileService } from 'src/app/services/userprofile/userprofile.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit {

  subscribeForm: FormGroup;
  showFooter = true;
  subscribed;
  message = "";
  error_message = '';
  subscribing = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private loggerService: LoggerService,
    public userProfileService: UserprofileService,
  ) {

  }

  ngOnInit() {
    // setTimeout(()=>{
    //   this.showFooter = false;
    // }, 3000)
    this.route.paramMap.subscribe(
      params => {
        // console.log("changed");
        // console.log(this.route.paramMap);
      }
    )

    this.subscribeForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(1), Validators.email]],
    })

    // this.loggerService.logData("uf-footer", this);
  }

  subscribeViaMail() {
    let email = this.subscribeForm.get("email").value;

    if (this.ValidateEmail(email)) {
      //make the service to send it to the mailing list
      this.subscribing = true;
      this.userProfileService.addSubscriber(email).subscribe(
        (result: any) => {
          if (result.value) {
            this.subscribed = true;
            this.subscribing = false;
            this.message = " <p> Thank you! <br> Stay tuned for the updates which we will be getting to you! </p> ";
          }
          else {
            this.subscribing = false;
            this.subscribed = false;
            this.error_message = "The email already exists in the mailing list";
          }
        },

      )
    }
    else{
      this.subscribed = false;
      this.error_message = "Invalid email id";
    }
  }

  ValidateEmail(mail) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
      return (true)
    }
    return (false)
  }

}
