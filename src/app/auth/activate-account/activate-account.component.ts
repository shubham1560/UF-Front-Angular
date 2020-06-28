import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent implements OnInit {

  token: string;
  message: string;
  constructor(private route: ActivatedRoute,
              private httpService: AuthService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        this.token = params.get('token');
      }
    )
    this.httpService.activate_account(this.token).subscribe(
      response =>{
        this.message = "Your account has been activated, Please log in now";
        console.log(response);
      },
      error => {
        this.message = 'There seems to be an error in the url';
        console.log(error);
        
      }
    )
  }

}
