import { Component, OnInit } from '@angular/core';
import { UserprofileService } from 'src/app/services/userprofile/userprofile.service';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';

@Component({
  selector: 'app-read-articles',
  templateUrl: './read-articles.component.html',
  styleUrls: ['./read-articles.component.scss']
})
export class ReadArticlesComponent implements OnInit {

  constructor(
    private userProfileService: UserprofileService,
    private loggerService: LoggerService
  ) { }

  articles;

  fetchedAllArticles = false;
  start = 0;
  numberOfArticlesToFetch = 100;
  end = this.start+ this.numberOfArticlesToFetch;

  isLoading= true;
  ngOnInit(): void {
    this.userProfileService.getUserReadArticle(this.start, this.end).subscribe(
      (result:any) =>{
        this.articles = result;
        this.isLoading = false
        this.start = this.start+this.numberOfArticlesToFetch;
        this.end = this.start + this.numberOfArticlesToFetch;
      }
    )
    this.loggerService.logData("uf-read-articles", this);
  }

  getNextPage(){
    console.log("hola")

    this.fetchArticles(this.start,this.end);
  }


  addBokmark(yo){
    console.log("hola");
    
  }

  fetchArticles(start, end){
    this.userProfileService.getUserReadArticle(start, end).subscribe(
      (result:any) =>{
        console.log(result);
        this.articles = this.articles.concat(result);
        this.isLoading = false
        this.start = this.start+this.numberOfArticlesToFetch;
        this.end = this.start + this.numberOfArticlesToFetch;
      }
    )
  }
}
