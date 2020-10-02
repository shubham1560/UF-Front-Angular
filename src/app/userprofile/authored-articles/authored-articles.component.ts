import { Component, OnInit } from '@angular/core';
import { UserprofileService } from 'src/app/services/userprofile/userprofile.service';

@Component({
  selector: 'app-authored-articles',
  templateUrl: './authored-articles.component.html',
  styleUrls: ['./authored-articles.component.scss']
})
export class AuthoredArticlesComponent implements OnInit {

  constructor(
    private userProfile: UserprofileService,
  ) { }


  articles_data;
  sort_by = "sys_created_on";
  // start = 0;
  ngOnInit(): void {
    this.userProfile.getUserAuthoredArticles(this.sort_by).subscribe(
      (response:any)=>{
        this.articles_data = response;
      }
    )
  }

  changeSort(sort){
    this.sort_by = sort;
    this.ngOnInit();
  }

}
