import { Component, OnInit } from '@angular/core';
import { UserprofileService } from 'src/app/services/userprofile/userprofile.service';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';

@Component({
  selector: 'app-bookmarkedarticles',
  templateUrl: './bookmarkedarticles.component.html',
  styleUrls: ['./bookmarkedarticles.component.scss']
})
export class BookmarkedarticlesComponent implements OnInit {

  constructor(
    private userprofile: UserprofileService,
    private loggerService: LoggerService,
  ) { }

  response: any ={};
  error: any= {};
  ngOnInit(): void {
    this.userprofile.getBookmarkedArticles().subscribe(
      result =>{
        this.response = result;
        console.log(this.response);
      },error=>{
        this.error = error;
      }
    )

    // this.loggerService.logData('bookmarkedArticles', this);
    
  }

}
