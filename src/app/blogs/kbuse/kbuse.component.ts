import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authservice/auth.service';
import { DataService } from 'src/app/services/knowledgeservice/knowledge.service';
import { LoginpromptComponent } from 'src/app/auth/loginprompt/loginprompt.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  ) { }

  article = '';
  found_useful = false;
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
            this._snackBar.open(message, "", {
              duration: 5000,
            });
          }
        )
      } else {
        console.log("did not find useful");
        this.knowledge.postUseArticle(this.article, 'false').subscribe(
          data => {
            console.log(data);
            var message = "We will be working on it"
            this._snackBar.open(message, "", {
              duration: 5000,
            });

          }
        )
      }
    }
    else {
      const dialogRef = this.dialog.open(LoginpromptComponent);
    }
  }

  bookmark() {
    if (this.authService.isLoggedIn()) {
      console.log("Bookmarked")
      this.knowledge.addBookmarkArticle(this.article).subscribe(
        data => {
          this.bookmarked = !this.bookmarked;
          if (this.bookmarked){
            var message = "Bookmarked the article"
            
          }
          else{
            var message = "Removed the bookmark"
          }
          this._snackBar.open(message, "", {
            duration: 5000,
          });
        }
      )
    }
    else {
      const dialogRef = this.dialog.open(LoginpromptComponent);
    }

  }

}
