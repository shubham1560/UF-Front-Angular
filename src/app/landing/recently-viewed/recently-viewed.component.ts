import { Component, OnInit } from '@angular/core';
import { UserprofileService } from 'src/app/services/userprofile/userprofile.service';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';

@Component({
  selector: 'app-recently-viewed',
  templateUrl: './recently-viewed.component.html',
  styleUrls: ['./recently-viewed.component.scss']
})
export class RecentlyViewedComponent implements OnInit {

  constructor(
    private userProfileService: UserprofileService,
    private loggerService: LoggerService,
  ) { }

  articles;

  fetchedAllArticles = false;
  start = 0;
  numberOfArticlesToFetch = 3;
  end = this.start+ this.numberOfArticlesToFetch;
  isLoading = true;

  ngOnInit(): void {
    this.userProfileService.getUserReadArticle(this.start, this.end).subscribe(
      (result:any) =>{
        this.articles = result;
        this.isLoading = false
      }
    )

    this.loggerService.logData("uf-recently-viewed", this);
  }

}
