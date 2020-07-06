import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/knowledge.service';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';

@Component({
  selector: 'app-all-articles',
  templateUrl: './all-articles.component.html',
  styleUrls: ['./all-articles.component.scss']
})
export class AllArticlesComponent implements OnInit {

  result:any;
  error;

  constructor(
    private knowledgeService: DataService,
    private logger: LoggerService,
  ) { }

  ngOnInit(): void {
    this.knowledgeService.getAllArticles().subscribe(
      resp => {
        this.result = resp["data"];
        console.log(resp)
      },
      error =>{
        this.error = error;
      } 
    )
    this.logger.logData('uf-all-articles', this);
  }

}
