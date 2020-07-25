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
  progress: number;
  isLoading =true;

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
    // setTimeout(() => {
    //   this.markViewed(this.article);
    //   this.isLoading = false;
    // }, 1000)
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
        this.markViewed(this.article);
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
    // if (this.authService.isLoggedIn()) {
    var totalNumArticles = 0;
    var totalReadArticles = 0;
    this.sections.forEach(section => {
      console.log(section);
      section.active = false;
      section.doneAll = true;
      var totalSectionArticles = 0
      var totalSectionReadArticles = 0;
      section.articles.forEach(article => {
        totalNumArticles += 1;
        totalReadArticles += 1;
        totalSectionArticles += 1;
        totalSectionReadArticles +=1;
        article.active = false;
        if (article.id == article_id) {
          section.active = true;
          if (this.authService.isLoggedIn()) {
            article.viewed = true;
          }
          article.active = true;
        }
        if (article.viewed == false) {
          totalReadArticles -= 1;
          totalSectionReadArticles -=1;
          section.doneAll = false;
        }
        section.progress = Math.round((totalSectionReadArticles/totalSectionArticles)*100)
      })

    });
    console.log(totalReadArticles, totalNumArticles);
    this.progress = Math.round((totalReadArticles / totalNumArticles) *100);
  }
  // }
}
