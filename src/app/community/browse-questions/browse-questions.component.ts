import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunityService } from '../../services/community/community.service'
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from 'src/app/services/authservice/auth.service';
import { LoginpromptComponent } from 'src/app/auth/loginprompt/loginprompt.component';
import { MatDialog } from '@angular/material/dialog';

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
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,

  ) { }

  questions;
  hidesmallscreen;
  data

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
        this.commService.getQuestions(root, path, article, 0, 50).subscribe(
          result=>{
            this.questions = result;
            

          }
        )
      }
    )
    this.loggerService.logData("st-question", this);
  }


  askQuestion(){
    if(this.authService.isLoggedIn()){
      this.router.navigateByUrl('/community/new_question');
    }
    else{
      this.openLoginPrompt()
    }
  }

  openLoginPrompt() {
    const dialogRef = this.dialog.open(LoginpromptComponent);
  }

}
