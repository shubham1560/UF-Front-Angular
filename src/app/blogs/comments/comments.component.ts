import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from 'src/app/services/knowledgeservice/knowledge.service';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  data = {};
  constructor(
    private httpService: DataService,
    private loggerService: LoggerService,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<CommentsComponent>,
    @Inject(MAT_DIALOG_DATA) public article_from_modal: any,
  ) { }

  article_id;

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        this.article_id = params.get('article');
        this.httpService.getRelatedComments(this.article_from_modal.name).subscribe(
          (response: any) => {
            this.data["response"] = response.data;
          },
          error => {
            this.data["error"] = error;
            this.data["response"] = [];
          }
        )
      }
    )
    this.loggerService.logData("article-comment", this);

  }

}
