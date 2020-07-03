import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/knowledge.service';
import { CxMenuService } from 'src/app/services/cx-menu/cx-menu.service';


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
              private dataLogger: CxMenuService) { }

  ngOnInit() {
    this.data["golibaaz"] = true;
    this.data.addon = true;
    this.knowledgeService.getAllArticles().subscribe(
      response => {
        this.data["articles"] = response;
      }, error =>{
        this.data["error"] = error;
      }
    )

    this.dataLogger.logData("articlelist", this.data);
  }
}
