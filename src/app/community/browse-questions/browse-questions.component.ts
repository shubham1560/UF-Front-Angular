import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommunityService } from '../../services/community/community.service'
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-browse-questions',
  templateUrl: './browse-questions.component.html',
  styleUrls: ['./browse-questions.component.scss']
})
export class BrowseQuestionsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private commService: CommunityService,
    private loggerService: LoggerService,
    private breakpointObserver: BreakpointObserver
  ) { }

  questions;
  hidesmallscreen;

  ngOnInit(): void {

    this.breakpointObserver.observe('(min-width: 768px)').subscribe(
      result => {
        this.hidesmallscreen = result.matches;
      }
    )

    this.route.queryParamMap.subscribe(
      params=>{
        // console.log(params);
        var root = params.get('root')
        var path = params.get('path');
        var article = params.get('article');
        this.commService.getQuestions(root, path, article, 0, 5).subscribe(
          result=>{
            // console.log(result);
            this.questions = result;
          }
        )
      }
    )
    this.loggerService.logData("st-question", this);
  }

}
