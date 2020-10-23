import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';
import { DataService } from 'src/app/services/knowledgeservice/knowledge.service';
import { HttpClient } from '@angular/common/http';
import { UrlconfigService } from 'src/app/services/urlconfig.service';

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
    private titleService: Title,
    private httpService: HttpClient,
    private url: UrlconfigService,

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
  sections;
  breadCrumb;
  initCourse;
  owner   //variable to get if the logged in guy is owner or not


  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        // console.log(params);
        if (window.location.hash == "") {
          let scrollToTop = window.setInterval(() => {
            let pos = window.pageYOffset;
            if (pos > 0) {
              window.scrollTo(0, pos - 20); // how far to scroll on each step
            } else {
              window.clearInterval(scrollToTop);
            }
          }, 16);
        }
        // console.log("changed");
        this.isLoading = true;
        this.article_id = params.get('article');
        this.category = params.get("category");
        if (this.article_id) {
          this.knowledge.getArticleById(this.article_id).subscribe(
            (result: any) => {
              this.article = result.data;
              // if(result.owner){
              this.owner = result.owner;
              // }
              this.isLoading = false;
              var len = this.article.article_body.length - 1;
              this.article_body = this.replacement(this.article.article_body.substring(1, len));
              this.fetchEmbedDetails();
              this.current_url = window.location.href;
              this.titleService.setTitle(this.article_body[0].data.text);
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
        // params.get("").
        setTimeout(() => {
          if (this.category != this.initCourse) {
            if (this.category != "article_preview") {
              this.knowledge.getRelatedSectionAndArticles(this.category).subscribe(
                (response: any) => {
                  this.sections = response.sections;
                  this.fetchArticles();
                  this.setNextPrevious();
                  this.initCourse = params.get("category");
                },
                error => {
                }
              )
            }
          }
          else {
            // this.setNextPrevious();
          }
        }, 1000)

        if (this.category == this.initCourse) {
          this.setNextPrevious();
        }

      }
    )

    setTimeout(()=>{
      this.observer();
    }, 500)

    // this.logger.logData("uf-article-detail", this)
    this.logger.logData('uf-article-detail', this)
  }

  articles = [];
  fetchArticles() {
    this.articles = [];
    this.sections.forEach(element => {
      element["articles"].forEach(element => {
        this.articles.push(element);
      });
    });
  }

  fetchEmbedDetails() {
    this.article_body.forEach(element => {
      if (element.type == "linkTool") {
        var link = element.data.link;
        var url = `${this.url.base_url}attachment/fetch_url/`;
        // console.log(url);
        // console.log(element);
        // link = encodeURI(link);
        this.httpService.get(url, { params: { "url": link }, headers: this.url.getHeader() }).subscribe(
          (response: any) => {
            element.data.meta = response.meta;
            // console.log(response);
          }, error => {
            // console.log(error);
          }
        );
      }
    });
  }

  setNextPrevious() {
    var counter = 0
    this.articles.forEach(element => {
      if (element["id"] == this.article_id) {
        if (counter != 0) {
          this.previousArticle = this.articles[counter - 1];
        }
        if (counter == 0) {
          this.previousArticle = null;
        }
        if (counter < this.articles.length) {
          this.nextArticle = this.articles[counter + 1];
        }
      }
      counter += 1;
    })
  }
  previousArticle;
  nextArticle;

  replacement = function (a) {
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
          c.push(JSON.parse(a.substring(j, i)));
          j = i + 1
        }
      }
    }
    c.push(JSON.parse(a.substring(j, a.length)));
    return c;
  }
  imageLoaded = false;
  onImageLoad() {
    this.imageLoaded = true;
  }

  observer(){
    var box = document.getElementById("Adding a heading");

    var callback = function (entries) {
      console.log(entries);
    }

    var observer = new IntersectionObserver(callback);
    observer.observe(box);
}
  
}
