import { Component, OnInit, ViewChild } from '@angular/core';
import { UserprofileService } from 'src/app/services/userprofile/userprofile.service';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';

@Component({
  selector: 'app-bookmarkedarticles',
  templateUrl: './bookmarkedarticles.component.html',
  styleUrls: ['./bookmarkedarticles.component.scss']
})
export class BookmarkedarticlesComponent implements OnInit {

  response: any = {};
  error: any = {};
  bookmarkedArticles: any = [];


  constructor(
    private userprofile: UserprofileService,
    private loggerService: LoggerService,
  ) { }



  ngOnInit(): void {
    this.userprofile.getBookmarkedArticles().subscribe(
      result => {
        this.response = result;
        this.bookmarkedArticles = this.response.bookmarked_articles
      }, error => {
        this.error = error;
      }
    )
    
    console.log(this.bookmarkedArticles[0]);
      
    // this.dataSource.paginator = this.paginator;
    // this.loggerService.logData('bookmarkedArticles', this);

  }


}

export interface BookmarkedArticles {
  "id": number,
  "article": string,
  "user": number,
  "get_article": {
    "id": string,
    "title": string,
    "description": string,
    "author": {
      "first_name": string,
      "id": string,
      "last_name": string,
    }
  }
}
