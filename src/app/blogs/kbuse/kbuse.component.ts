import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authservice/auth.service';
import { DataService } from 'src/app/services/knowledgeservice/knowledge.service';
import { LoginpromptComponent } from 'src/app/auth/loginprompt/loginprompt.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FeedbackComponent } from '../feedback/feedback.component';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';

@Component({
  selector: 'app-kbuse',
  templateUrl: './kbuse.component.html',
  styleUrls: ['./kbuse.component.scss']
})
export class KbuseComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private knowledge: DataService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private loggerService: LoggerService,
  ) { }

  article = '';
  found_useful: boolean;
  bookmarked: boolean;
  isLoading = true;

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
        this.article = params.get('article');
        this.viewed(this.article);
        setTimeout(() =>
          this.knowledge.ifArticleBookmarkedByUser(this.article).subscribe(
            (data: any) => {
              console.log(data);
              this.found_useful = data.found_useful;
              this.bookmarked = data.bookmarked;
              this.isLoading = false;
            }
          )
          , 2000)
      }
    )

    this.loggerService.logData('uf-kbuse', this);
    // this.knowledge.postUseArticle()
  }

  viewed(article) {
    this.knowledge.postUseArticle(article, 'no_response').subscribe(
      (response: any) => {
        console.log(response)
      },
      error => {
      }
    )
  }


  markUseful(useful) {
    if (this.authService.isLoggedIn()) {
      if (useful) {
        this.found_useful = true;
        this.knowledge.postUseArticle(this.article, 'true').subscribe(
          (data: any) => {
            console.log(data);
            var message = "We are glad that you find the article useful"
            this.showSnackBar(message);
          }
        )
      } else {
        console.log("did not find useful");
        this.knowledge.postUseArticle(this.article, 'false').subscribe(
          data => {
            console.log(data);
            this.found_useful = false;
            this.showSnackBar("we will working on improving the article");
            this.openDialog();
          }
        )
      }
    }
    else {
      this.openLoginPrompt()
    }
  }

  bookmark() {
    if (this.authService.isLoggedIn()) {
      console.log("Bookmarked")
      this.knowledge.addBookmarkArticle(this.article).subscribe(
        data => {
          this.bookmarked = !this.bookmarked;
          if (this.bookmarked) {
            var message = "Added the bookmark to the article!";
          }
          else {
            var message = "Removed the bookmark to the article!";
          }
          this.showSnackBar(message);
        }
      )
    }
    else {
      this.openLoginPrompt()
    }

  }

  sendFeedback() {
    if (this.authService.isLoggedIn()) {
      console.log("open the modal");
      this.openDialog();
    } else {
      this.openLoginPrompt();
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(FeedbackComponent, {
      // width: '250px', 
      // width: '100%',
      data: { name: this.article }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openLoginPrompt() {
    const dialogRef = this.dialog.open(LoginpromptComponent);
  }

  showSnackBar(message) {
    var message = message;
    this._snackBar.open(message, "", {
      duration: 5000,
    });
  }

}
