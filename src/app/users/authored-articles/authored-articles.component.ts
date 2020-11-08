import { Component, OnInit } from '@angular/core';
import { UserprofileService } from 'src/app/services/userprofile/userprofile.service';

@Component({
  selector: 'app-authored-articles',
  templateUrl: './authored-articles.component.html',
  styleUrls: ['./authored-articles.component.scss']
})
export class AuthoredArticlesComponent implements OnInit {

  constructor(
    private profileService: UserprofileService
  ) { }

  articles;

  ngOnInit(): void {
    this.profileService.getPublicUserAuthoredArticles('title', 'shubhamsinha2050').subscribe(
      (result:any)=>{
        this.articles = result.articles;
      }
    )
  }

}
