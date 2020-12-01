import { Component, OnInit } from '@angular/core';
import { UserprofileService } from 'src/app/services/userprofile/userprofile.service';

@Component({
  selector: 'app-articles-nav',
  templateUrl: './articles-nav.component.html',
  styleUrls: ['./articles-nav.component.scss']
})
export class ArticlesNavComponent implements OnInit {

  constructor(
    private userProfile: UserprofileService,
  ) { }

  sort_by = "sys_created_on";
  state = 'all';
  articles_data;


  ngOnInit(): void {
    this.userProfile.getUserAuthoredArticles(this.sort_by, this.state).subscribe(
      (response: any) => {
        this.articles_data = response;
      }
    )
  }

}
