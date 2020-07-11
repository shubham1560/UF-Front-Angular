import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/knowledgeservice/knowledge.service';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';
import { AuthService } from 'src/app/services/authservice/auth.service';

@Component({
  selector: 'app-all-articles',
  templateUrl: './all-articles.component.html',
  styleUrls: ['./all-articles.component.scss']
})
export class AllArticlesComponent implements OnInit {

  result: any;
  error;
  newResult: [];
  totalArticles: number;
  numRecords: number = 5;
  start: number = 0;
  ghostEl: number = 5
  end: number = this.start + this.numRecords;
  endReached = false;
  isLoading = true;
  constructor(
    private knowledgeService: DataService,
    private logger: LoggerService,
    private authService: AuthService,
  ) { }

  addBokmark(article_id) {
    if (this.authService.isLoggedIn()) {
      console.log(article_id);
      this.knowledgeService.addBookmarkArticle(article_id).subscribe(
        result => {
          console.log(result);
          for (var i = 0; i < this.result.length; i++) {
            if (this.result[i].id == article_id) {
              this.result[i].bookmarked = !this.result[i].bookmarked!;
            }
          }
          // this.result = []
        }, error => {
          console.log(error);
        }
      )
    }
    else{
      console.log("Please Log in first");
      
    }
  }

  getNextPage(start = this.start, end = this.end): [] {
    console.log(start, end);
    // console.log("called");
    this.isLoading = true;
    if (this.start <= this.totalArticles) {
      this.knowledgeService.getPaginatedArticles(start, end).subscribe(
        response => {
          this.result = this.result.concat(response["data"]);
          this.start += this.numRecords;
          this.end += this.numRecords;
          this.isLoading = false;
        },
        error => {
          this.error = error;

        }
      )
    }
    if (this.start <= this.totalArticles && this.end >= this.totalArticles || this.start > this.totalArticles) {
      this.endReached = true;
      this.isLoading = false;
    }
    return []
  }

  ngOnInit(): void {
    this.knowledgeService.getPaginatedArticles(this.start, this.end).subscribe(
      response => {
        this.totalArticles = response["total_articles"];
        // this.totalArticles = 30;
        this.start += this.numRecords;
        this.end += this.numRecords;
        this.result = response["data"];
        this.isLoading = false;
      },
      err => {
        this.error = err;
      }
    )


    this.logger.logData('uf-all-articles', this);
  }

  identify(index, item) {
    console.log(index)
    return index;
  }

}
