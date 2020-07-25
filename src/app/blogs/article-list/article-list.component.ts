import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/knowledgeservice/knowledge.service';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/authservice/auth.service';


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
    private dataLogger: LoggerService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) { }

  course = "";
  panelOpenState = false;
  sections: any;
  article;
  courseInit;
  courseName;

  ngOnInit() {
    // this.data["golibaaz"] = true;
    // this.data.addon = true;
    this.route.paramMap.subscribe(
      result => {
        this.course = result.get("category");
        this.article = result.get("article");
        if (this.course != this.courseInit) {
          console.log("changed");
          this.changeTheCourse();
        }
      }
    )
    setTimeout(() => {
      this.markViewed(this.article);
    }, 1000)
    this.courseInit = this.course;
    //At the end to get the data from the component, any time the data changes, the realtime data can be seen
    this.dataLogger.logData("articlelist", this);
  }

  changeTheCourse() {
    this.knowledgeService.getRelatedSectionAndArticles(this.course).subscribe(
      (response: any) => {
        this.courseName = response.course;
        this.sections = response.sections;
        if (!this.article) {
          this.article = this.sections[0].articles[0].id;
          this.navigate(this.article);
        }
      }, error => {
        this.data["error"] = error;
      }
    )

  }

  navigate(article_id) {
    console.log(article_id);
    var url = `courses/${this.course}/${article_id}`
    this.markViewed(article_id)
    // this.router.navigateByUrl(url);
    this.router.navigate(['courses', this.course, article_id])
  }

  markViewed(article_id) {
    if (this.authService.isLoggedIn()) {
      this.sections.forEach(element => {
        console.log(element);
        element.active = false;
        element.articles.forEach(article => {
          article.active = false;
          if (article.id == article_id) {
            element.active = true;
            article.viewed = true;
            article.active = true;
          }
        })
      });
    }
  }
}
