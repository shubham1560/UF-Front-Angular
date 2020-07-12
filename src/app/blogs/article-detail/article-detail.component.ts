import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';
import { DataService } from 'src/app/services/knowledgeservice/knowledge.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private logger: LoggerService,
    private knowledge: DataService,
  ) { }

  article_id: string;
    article: any ={};


  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        this.article_id = params.get('article');
        this.knowledge.getArticleById(this.article_id).subscribe(
          result=>{
            this.article = result;
          }, error =>{
            this.article = {};
            console.log(error);
          }
        )
      }
    )

    this.logger.logData('uf-article-detail', this)
  }

}
