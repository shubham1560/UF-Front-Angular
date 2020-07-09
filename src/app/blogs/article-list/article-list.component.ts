import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/knowledgeservice/knowledge.service';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';


@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  data = {
    "addon": false
  };

  constructor(private knowledgeService: DataService,
              private dataLogger: LoggerService) { }

  ngOnInit() {
    this.data["golibaaz"] = true;
    this.data.addon = true;
    this.knowledgeService.getAllArticles().subscribe(
      response => {
        this.data["response"] = response;
      }, error =>{
        this.data["error"] = error;
      }
    )
    

    //At the end to get the data from the component, any time the data changes, the realtime data can be seen
    this.dataLogger.logData("articlelist", this);
  }
}
