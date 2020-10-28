import { Component, OnInit } from '@angular/core';
import { UserprofileService } from 'src/app/services/userprofile/userprofile.service';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-authored-articles',
  templateUrl: './authored-articles.component.html',
  styleUrls: ['./authored-articles.component.scss']
})
export class AuthoredArticlesComponent implements OnInit {

  constructor(
    private userProfile: UserprofileService,
    private loggerService: LoggerService,
    private titleService: Title
  ) { }


  articles_data;
  sort_by = "sys_created_on";
  all_articles;
  state = 'all';
  isLoading = false;

  ngOnInit(): void {
    this.userProfile.getUserAuthoredArticles(this.sort_by, this.state).subscribe(
      (response: any) => {
        this.articles_data = response;
        this.isLoading = false;
      }
    )
    this.titleService.setTitle("My articles - SortedTree");
    this.loggerService.logData("uf-authored-articles", this);

  }

  changeState(state_to_change: string) {
    this.state = state_to_change;
    this.isLoading = true;
    this.ngOnInit();
  }

  deleteArticle(id){
    console.log(id);
  }

  changeSort(sort: string) {
    if (this.articles_data.articles.length > 1) {
      this.isLoading = true;
      if (sort == this.sort_by) {
        if (sort[0] == "-") {
          this.sort_by = sort.substring(1, sort.length)
        }
        else {
          this.sort_by = "-" + sort;
        }
      } else {
        this.sort_by = sort;
      }
      if (sort == 'workflow') {
        this.sort_by = 'workflow';
      }
      this.ngOnInit();
    }
  }

}
