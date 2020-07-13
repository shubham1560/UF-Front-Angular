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


  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        this.article_id = params.get('article');
        this.knowledge.getArticleById(this.article_id).subscribe(
          (result: any) => {
            this.article = result.data;
            this.isLoading = false;
            console.log(this.article.getAuthor.header_image);
            console.log(this.article.getAuthor.google_pic);
            if (this.article.getAuthor.google_pic){
              this.authorImage = this.article.getAuthor.google_pic;
            }
            else{
              this.authorImage = this.article.getAuthor.header_image
            }
          }, error => {
            this.article = {};
            console.log(error);
          }
        )
      }
    )

    setTimeout(() => {
      this.loadOriginalImage = true;
      // console.log("yo maan");
    }, 6000);


    this.logger.logData('uf-article-detail', this)
  }

}
