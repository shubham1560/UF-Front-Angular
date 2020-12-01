import { Component, OnInit } from '@angular/core';
import { UserprofileService } from 'src/app/services/userprofile/userprofile.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-articles-nav',
  templateUrl: './articles-nav.component.html',
  styleUrls: ['./articles-nav.component.scss']
})
export class ArticlesNavComponent implements OnInit {

  constructor(
    private userProfile: UserprofileService,
    private route: ActivatedRoute
  ) { }

  sort_by = "sys_created_on";
  state = 'all';
  articles_data;
  published = [];
  review = [];
  draft = [];
  selected_article_id;
  loading = true;

  ngOnInit(): void {
    // this.loading = true;
    this.userProfile.getUserAuthoredArticles(this.sort_by, this.state).subscribe(
      (response: any) => {
        this.articles_data = response;
        this.mapToCategory();
        this.loading = false;
      }
    )

    this.route.paramMap.subscribe(
      params=>{
        console.log(params);
        this.selected_article_id = params.get('id');

      }
    )
  }

  mapToCategory(){
    this.articles_data.articles.forEach(element => {
      console.log(element);
      if(element.workflow == 'published'){
        this.published.push(element)
      }
      else if(element.workflow == 'draft'){
        this.draft.push(element);
      }
      else{
        this.review.push(element);
      }
    });
  }


}
