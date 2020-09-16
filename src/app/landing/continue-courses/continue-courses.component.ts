import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/knowledgeservice/knowledge.service';
import { UserprofileService } from 'src/app/services/userprofile/userprofile.service';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';

@Component({
  selector: 'app-continue-courses',
  templateUrl: './continue-courses.component.html',
  styleUrls: ['./continue-courses.component.scss']
})
export class ContinueCoursesComponent implements OnInit {

  constructor(
    private userService: UserprofileService,
    private loggerService: LoggerService
  ) { }

  courses: any;

  ngOnInit(): void {
    this.userService.getUserStartedCourse(0,10).subscribe(
      (result:any) =>{
        this.courses = result
      }
    )

    this.loggerService.logData("uf-recently-viewed-course", this);
  }

}
