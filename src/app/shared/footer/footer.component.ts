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
      params=>{
        // console.log("changed");
        // console.log(this.route.paramMap);
      }
    )

    this.subscribeForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(1), Validators.email]],
    })

    // this.loggerService.logData("uf-footer", this);
  }

  subscribeViaMail(){
    let email = this.subscribeForm.get("email").value;
    console.log( email );
    //make the service to send it to the mailing list
    this.userProfileService.addSubscriber(email).subscribe(
      result => {
        console.log(result);
      }
    )
  }

}
