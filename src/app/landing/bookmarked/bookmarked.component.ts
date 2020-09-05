import { Component, OnInit } from '@angular/core';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';
import { UserprofileService } from 'src/app/services/userprofile/userprofile.service';

@Component({
  selector: 'app-bookmarked',
  templateUrl: './bookmarked.component.html',
  styleUrls: ['./bookmarked.component.scss']
})
export class BookmarkedComponent implements OnInit {

  constructor(
    private loggerService: LoggerService,
    private userService: UserprofileService
  ) { }
  bookmarkedArticles;
  ngOnInit(): void {
    this.userService.getBookmarkedArticles(0, 3).subscribe(
      (result:any) =>{
        this.bookmarkedArticles = result;

      }
    )
    this.loggerService.logData("uf-bookmarked", this);
  }

}
