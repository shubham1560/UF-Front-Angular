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
  article: any = {};
  isLoading = true;
  image: string = ""
  loadOriginalImage: boolean = false;
  authorImage = "";
  category;
  current_url = window.location.href;
  article_body;

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        // console.log("changed");
        this.isLoading = true;
        this.article_id = params.get('article');
        this.category = params.get("category");
        if (this.article_id) {
          this.knowledge.getArticleById(this.article_id).subscribe(
            (result: any) => {
              this.article = result.data;
              this.isLoading = false;
              var len = this.article.article_body.length - 1;
              this.article_body = this.replacement(this.article.article_body.substring(1, len));
              this.current_url = window.location.href;

              // console.log(this.article.getAuthor.header_image);
              // console.log(this.article.getAuthor.google_pic);
              // console.log(result);
              if (this.article.getAuthor.google_pic) {
                this.authorImage = this.article.getAuthor.google_pic;
              }
              else {
                this.authorImage = this.article.getAuthor.header_image
              }
            }, error => {
              this.article = {};
              // console.log(error);
            }
          )
        }
      }
    )
    // this.logger.logData("uf-article-detail", this)
    this.logger.logData('uf-article-detail', this)
  }


  replacement = function(a) {
    let b = []
    let c = []
    let j = 0
    for (var i = 0; i < a.length; i++) { 
      if (a[i] == "{") {
        b.push("{"); 
      } 
      if (a[i] == "}") { 
        b.pop(); 
      } 
      if (b.length == 0) {
        if (a[i] == ',') { 
          c.push(JSON.parse(a.substring(j, i)))  ;
          j = i+1
        } 
      } 
    }
    c.push(JSON.parse(a.substring(j, a.length)))  ;
    return c;
  }

}
