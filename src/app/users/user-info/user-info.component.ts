import { Component, OnInit } from '@angular/core';
import { UserprofileService } from 'src/app/services/userprofile/userprofile.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  constructor(
    public profile: UserprofileService,
    private titleService: Title,
    private route: ActivatedRoute
  ) { }

  response;
  isLoading = true;
  image;
  name ;
  display_name;
  email;
  about;
  error;

  ngOnInit(): void {

    this.route.paramMap.subscribe(
      result=>{
        // console.log(result);
        var user_id = result.get("user_id");
        this.profile.getUserDataPublic(user_id).subscribe(
          result => {
            this.response = result;
            this.isLoading = false;
            this.image = this.response.user.header_image ? this.response.user.header_image : this.response.user.profile_pic;
            this.name = this.response.user.first_name + " " + this.response.user.last_name;
            this.display_name = this.response?.user.first_name[0];
            if (this.response.user.last_name){
              this.display_name += this.response.user?.last_name[0]
            }
            this.email = this.response.user.email;
            this.about = this.response.user.about;
            this.titleService.setTitle(this.name + " - SortedTree");
          },
          error => {
            this.error = error;
          }
        )
    
      }
    )
    
  }

}

