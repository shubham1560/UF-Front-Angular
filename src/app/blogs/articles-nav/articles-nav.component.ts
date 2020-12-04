import { Component, OnInit } from '@angular/core';
import { UserprofileService } from 'src/app/services/userprofile/userprofile.service';
import { ActivatedRoute } from '@angular/router';
import { DeleteArticleComponent } from '../delete-article/delete-article.component';
import { MatDialog } from '@angular/material/dialog';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';

@Component({
  selector: 'app-articles-nav',
  templateUrl: './articles-nav.component.html',
  styleUrls: ['./articles-nav.component.scss']
})
export class ArticlesNavComponent implements OnInit {

  constructor(
    private userProfile: UserprofileService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private log : LoggerService
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
    this.log.logData("article-nav", this);
  }

  mapToCategory(){
    this.published = [];
    this.draft = [];
    this.review = [];
    this.articles_data.articles.forEach(element => {
      // console.log(element);
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

  openDialog(id, title): void {
    const dialogRef = this.dialog.open(DeleteArticleComponent, {
      data: {article_id:  id, article_title: title}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.delete){
        this.deleteArticle(id);
      }
    });
  }

  deleteArticle(id){
    var afterDeletedArray = []
    this.articles_data.articles.forEach(element => {
      if(element.id!=id){
        afterDeletedArray.push(element);
      }
    });

    this.articles_data.articles = afterDeletedArray;
    this.mapToCategory();
  }

}
