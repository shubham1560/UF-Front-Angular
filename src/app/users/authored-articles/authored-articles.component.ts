import { Component, OnInit } from '@angular/core';
import { UserprofileService } from 'src/app/services/userprofile/userprofile.service';
import { ActivatedRoute } from '@angular/router';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';

@Component({
  selector: 'app-authored-articles',
  templateUrl: './authored-articles.component.html',
  styleUrls: ['./authored-articles.component.scss']
})
export class AuthoredArticlesComponent implements OnInit {

  constructor(
    private profileService: UserprofileService,
    private route: ActivatedRoute,
    private logger: LoggerService
  ) { }

  articles;
  loading = true;
  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
        // console.log(params);
        this.profileService.getPublicUserAuthoredArticles('title', params.get("user_id")).subscribe(
          (result: any) => {
            this.loading = false;
            this.articles = result.articles;
            this.mapToPath();
          }
        )
      }
    )
    this.logger.logData("uf-user-info", this);
  }

  paths = [];

  mapToPath() {
    this.paths = [];
    this.articles.forEach(element => {
      var category_found = false;
      this.paths.forEach(element1 => {
        if (element.get_category.id == element1.category_id) {
          element1.articles.push(element);
          category_found = true;
        }
      });
      if (!category_found) {
        this.paths.push({ "category_label": element.get_category.category_label, "category_id": element.get_category.id, "articles": [element] });
      }
    });
  }

}
