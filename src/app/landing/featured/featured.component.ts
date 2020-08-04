import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/knowledgeservice/knowledge.service';
import { UserprofileService } from 'src/app/services/userprofile/userprofile.service';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit {

  constructor(
    private userProfileService: UserprofileService,
  ) { }

  ngOnInit(): void {
    this.userProfileService.getUserStartedCourse(0, 5).subscribe(
      result=>{
        console.log(result);
      }
    )
  }

}
