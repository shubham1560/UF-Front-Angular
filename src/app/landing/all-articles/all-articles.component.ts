import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/knowledge.service';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';

@Component({
  selector: 'app-all-articles',
  templateUrl: './all-articles.component.html',
  styleUrls: ['./all-articles.component.scss']
})
export class AllArticlesComponent implements OnInit {

  result: Int32Array[];
  error;
  newResult: [];
  totalArticles: number;
  numRecords: number = 10;
  start: number = 0;
  end: number = this.start + this.numRecords;
  endReached = false;

  constructor(
    private knowledgeService: DataService,
    private logger: LoggerService,
  ) { }

  getNextPage(start = this.start, end = this.end): [] {
    // console.log(start, end);
    console.log("called");
    if (this.start <= this.totalArticles) {
      this.knowledgeService.getPaginatedArticles(start, end).subscribe(
        response => {
          this.result = this.result.concat(response["data"]);
          this.start += this.numRecords;
          this.end += this.numRecords;
        },
        error => {
          this.error = error;

        }
      )
    }
    if(this.start <= this.totalArticles && this.end >= this.totalArticles){
      this.endReached = true;
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
      },
      err => {
        this.error = err;
      }
    )


    this.logger.logData('uf-all-articles', this);
  }


}
