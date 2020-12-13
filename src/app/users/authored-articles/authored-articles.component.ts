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
          }
        )
      }
    )
    this.logger.logData("uf-user-info", this);
  }

}
