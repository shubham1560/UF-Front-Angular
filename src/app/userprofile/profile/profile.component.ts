import { Component, OnInit } from '@angular/core';
import { UrlconfigService } from 'src/app/services/urlconfig.service';
import { UserprofileService } from 'src/app/services/userprofile/userprofile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private profile: UserprofileService,
  ) { }
  
  response:{};

  ngOnInit(): void {
    this.profile.getUserData().subscribe(
      result =>{
        this.response = result;
        console.log(result);
      }
    )
  }

}
