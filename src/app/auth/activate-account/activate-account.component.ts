import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/authservice/auth.service';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent implements OnInit {

  data = {}
  // activated: boolean;
  // token: string;
  // message: string;
  // icon: string;

  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private loggerService: LoggerService) {
  }

  ngOnInit() {
    var a = this.data;

    this.route.paramMap.subscribe(
      params => {
        this.data["token"] = params.get('token');
        console.log("running");
      }
    )
    this.authService.activate_account(this.data["token"]).subscribe(
      response =>{
        this.data["message"] = "Your account has been activated, you can Sign in now";
        this.data["activated"] = true;
        this.data["icon"] = "verified_user";
        this.data["response"] = response;
        // console.log(response);
      },
      error => {
        this.data["message"] = 'There seems to be an error in the url';
        this.data["activated"] = false;
        this.data["icon"] = "report_problem";
        this.data["error"] = error;
        console.log(error);
        
      }
    )
    this.loggerService.logData("activateaccount", this)
  }

}
