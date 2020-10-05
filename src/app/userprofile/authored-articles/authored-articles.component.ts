import { Component, OnInit } from '@angular/core';
import { UserprofileService } from 'src/app/services/userprofile/userprofile.service';
import { state } from '@angular/animations';

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
  all_articles;
  state = 'all';
  // start = 0;
  ngOnInit(): void {
    this.userProfile.getUserAuthoredArticles(this.sort_by, this.state).subscribe(
      (response:any)=>{
        // this.all_articles = response
        this.articles_data = response;
      }
    )
  }

  // filterByState(state){
  //   this.articles_data = this.all_articles[0]
  // }  

  changeState(state_to_change: string){
    this.state = state_to_change;
    this.ngOnInit();  
    // console.log("called")
    // console.log(this);
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
