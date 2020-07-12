import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/knowledgeservice/knowledge.service';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  data = {};
  constructor(
    private httpService: DataService,
    private loggerService: LoggerService,
    private route: ActivatedRoute,
  ) { }

  article_id;

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        this.article_id = params.get('article');
        this.httpService.getRelatedComments(this.article_id).subscribe(
          (response: any) => {
            this.data["response"] = response.data;
          },
          error => {
            this.data["error"] = error;
            this.data["response"] = [];
          }
        )
      }
    )
    this.loggerService.logData("article-comment", this);

  }

}
