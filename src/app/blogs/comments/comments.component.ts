import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/knowledgeservice/knowledge.service';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  data = {};
  constructor(
    private httpService: DataService,
    private loggerService: LoggerService
  ) { }

  ngOnInit() {
    this.httpService.getRelatedComments("testing").subscribe(
      response =>{
        this.data["response"] = response;
      },
      error => {
        this.data["error"] = error;
      }
    );
    this.loggerService.logData("article-comment", this);

  }

}
