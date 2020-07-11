import { Component, OnInit, ViewChild, Input } from '@angular/core';
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


  ghostEl = 3;
  response: any = {};
  error: any = {};
  bookmarkedArticles: any = [];
  displayedColumns: string[] =['position']
  isLoading = true;

  dataSource : MatTableDataSource<BookmarkedArticles>;

  constructor(
    private userprofile: UserprofileService,
    private loggerService: LoggerService,
  ) { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  ngOnInit(): void {

    this.userprofile.getBookmarkedArticles().subscribe(
      result => {
        this.response = result;
        this.bookmarkedArticles = this.response.bookmarked_articles
        var dataSource = new MatTableDataSource<BookmarkedArticles>(this.bookmarkedArticles);
        this.dataSource = dataSource;
        this.dataSource.paginator = this.paginator
        console.log(this.dataSource)
        this.isLoading = false;
      }, error => {
        this.error = error;
      }
    )
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
