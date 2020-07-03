import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/knowledge.service';


@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  constructor(private knowledgeService: DataService) { }

  ngOnInit() {
    this.knowledgeService.getAllArticles().subscribe(
      response => {
        console.log(response);
      }, error =>{
        console.log(error);
      }
    )
  }

}
