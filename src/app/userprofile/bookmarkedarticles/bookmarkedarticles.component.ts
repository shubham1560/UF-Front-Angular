import { Component, OnInit, ViewChild } from '@angular/core';
import { UserprofileService } from 'src/app/services/userprofile/userprofile.service';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-bookmarkedarticles',
  templateUrl: './bookmarkedarticles.component.html',
  styleUrls: ['./bookmarkedarticles.component.scss']
})
export class BookmarkedarticlesComponent implements OnInit {

  response: any = {};
  error: any = {};
  bookmarkedArticles: any = [];
  dataSource : MatTableDataSource<BookmarkedArticles>;

  constructor(
    private userprofile: UserprofileService,
    private loggerService: LoggerService,
  ) { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  ngOnInit(): void {
    this.userprofile.getBookmarkedArticles().subscribe(
      result => {
        this.response = result;
        this.bookmarkedArticles = this.response.bookmarked_articles
        this.dataSource = this.bookmarkedArticles
      }, error => {
        this.error = error;
      }
    )
  }
  ngAfterViewInit(): void{
    this.dataSource.paginator = this.paginator
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