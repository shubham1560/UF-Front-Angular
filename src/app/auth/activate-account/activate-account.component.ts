import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent implements OnInit {

  activated: boolean;
  token: string;
  message: string;
  icon: string;
  constructor(private route: ActivatedRoute,
              private authService: AuthService) {
  }

  ngOnInit() {

    this.authService.removeFooter();
    
    this.route.paramMap.subscribe(
      params => {
        this.token = params.get('token');
      }
    )
    this.authService.activate_account(this.token).subscribe(
      response =>{
        this.message = "Your account has been activated, you can log in now";
        this.activated = true;
        this.icon = "verified_user";
        console.log(response);
      },
      error => {
        this.message = 'There seems to be an error in the url';
        this.activated = false;
        this.icon = "report_problem";
        console.log(error);
        
      }
    )
  }

}
