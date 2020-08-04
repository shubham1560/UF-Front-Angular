import { Component, OnInit } from '@angular/core';
import { UserprofileService } from 'src/app/services/userprofile/userprofile.service';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';

@Component({
  selector: 'app-read-articles',
  templateUrl: './read-articles.component.html',
  styleUrls: ['./read-articles.component.scss']
})
export class ReadArticlesComponent implements OnInit {

  constructor(
    private userProfileService: UserprofileService,
    private loggerService: LoggerService
  ) { }

  articles;

  isLoading= true;
  ngOnInit(): void {
    this.userProfileService.getUserReadArticle(0, 4).subscribe(
      (result:any) =>{
        this.articles = result;
        this.isLoading = false
      }
    )
    this.loggerService.logData("uf-read-articles", this);
  }

  getNextPage(){
    console.log("hola")
  }


  addBokmark(yo){
    console.log("hola");
    
  }
}
