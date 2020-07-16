import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommentsComponent } from '../comments/comments.component';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/knowledgeservice/knowledge.service';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';

@Component({
  selector: 'app-seecomments',
  templateUrl: './seecomments.component.html',
  styleUrls: ['./seecomments.component.scss']
})
export class SeecommentsComponent implements OnInit {

  constructor(public dialog: MatDialog,
    private route: ActivatedRoute,
  ) { }

  article: string;
  comments: any;
  responses: number;

  ngOnInit(): void {
  }



  openDialog() {
    this.route.paramMap.subscribe(
      params => {
        this.article = params.get('article')

        const dialogRef = this.dialog.open(CommentsComponent, {
          // width: '250px', 
          // width: '100%',
          data: { name: this.article }
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });

      }
    )


  }

}
