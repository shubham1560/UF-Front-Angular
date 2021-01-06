import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/knowledgeservice/knowledge.service';

@Component({
  selector: 'app-article-analysis',
  templateUrl: './article-analysis.component.html',
  styleUrls: ['./article-analysis.component.scss']
})
export class ArticleAnalysisComponent implements OnInit {

  constructor(
    private knowledge: DataService,
    public dialogRef: MatDialogRef<ArticleAnalysisComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  response;
  found_useful = 0;
  not_useful = 0;
  feedbacks = 0;
  views = 0;
  filtered_response=[];
  heading = "All viewers";
  loading = true;

  ngOnInit(): void {
    this.knowledge.getAnalysis(this.data.article_id).subscribe(
      (result:any) => {
        this.response = result;
        this.filtered_response = result;
        this.getAnalysis();
        this.loading = false;
      }
    )
  }

  getAnalysis() {
    this.response.forEach(element => {
      if (element.viewed) {
        this.views += 1
      }
      if (element.useful != null) {
        if (element.useful) {
          this.found_useful += 1;
        } else {
          this.not_useful += 1;
        }
      }
      if (element.feedback) {
        this.feedbacks += 1;
      }
    });
  }

  filter(param){
    console.log("running");
    
    this.filtered_response = [];
    this.response.forEach(element => {
      // console.log(element);
      
      if(param == 'useful'){
        if(element.useful == true){
          this.filtered_response.push(element);
        }
        this.heading = "People who find the article useful";
      }
      if(param == 'feedback'){
        if(element.feedback){
          this.filtered_response.push(element);
        }
        this.heading = "People with feedback for the article";
      }
      if(param == 'not_useful'){
        if(element.useful == false){
          this.filtered_response.push(element);
        }
        this.heading = "People who don't find the article useful";
      }
      if(param == 'clear'){
        this.filtered_response = this.response;
        this.heading = "All Viewers of this article";

      }
    });

  }
}
