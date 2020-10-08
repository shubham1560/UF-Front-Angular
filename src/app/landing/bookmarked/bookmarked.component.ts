import { Component, OnInit, Inject } from '@angular/core';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';
import { UserprofileService } from 'src/app/services/userprofile/userprofile.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-bookmarked',
  templateUrl: './bookmarked.component.html',
  styleUrls: ['./bookmarked.component.scss']
})
export class BookmarkedComponent implements OnInit {

  constructor(
    private loggerService: LoggerService,
    private userService: UserprofileService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  bookmarkedArticles;
  start = 0;
  end = 5;
  showButton = true;
  title = "Recently Bookmarked";
  ngOnInit(): void {
    if (this.data["modal"]){
      this.end = 0;
      this.showButton = false;
      this.title = "All Bookmarked Articles";
    }
    this.userService.getBookmarkedArticles(this.start, this.end).subscribe(
      (result:any) =>{
        this.bookmarkedArticles = result.bookmarked_articles;
      }
    )
    this.loggerService.logData("uf-bookmarked", this);
  }


  openAllBookmarkedArticles(){
    this.dialog.open(BookmarkedComponent, 
      {
        data: {"modal": true}
      }
      );
  }
}
