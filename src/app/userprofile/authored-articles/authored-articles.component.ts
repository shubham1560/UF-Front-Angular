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

  changeSort(sort: string){
    if (sort == this.sort_by){
      if(sort[0]=="-"){
      this.sort_by = sort.substring(1, sort.length)
      }
      else{
        this.sort_by = "-"+sort;
      }
    }else{
      this.sort_by = sort;
    }
    if(sort == 'workflow'){
      this.sort_by = 'workflow';
    }
    this.ngOnInit();
  }

}
