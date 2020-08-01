import { Component, OnInit } from '@angular/core';
import { UserprofileService } from 'src/app/services/userprofile/userprofile.service';

@Component({
  selector: 'app-read-articles',
  templateUrl: './read-articles.component.html',
  styleUrls: ['./read-articles.component.scss']
})
export class ReadArticlesComponent implements OnInit {

  constructor(
    private userProfileService: UserprofileService,
  ) { }

  ngOnInit(): void {
    this.userProfileService.getUserStartedCourse().subscribe(
      result =>{
        console.log(result);
      }
    )
  }

}
