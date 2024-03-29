import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from 'src/app/services/knowledgeservice/knowledge.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ArticleListComponent } from '../article-list/article-list.component';
import { ActivatedRoute } from '@angular/router';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  constructor(
    private knowledgeService: DataService,
    private dialog: MatDialog,
    private router: ActivatedRoute,
    private logger: LoggerService,
    public dialogRef: MatDialogRef<CoursesComponent>,
    @Inject(MAT_DIALOG_DATA) public datum: any
  ) { }

  courses;
  filteredCourses = [];
  name;
  input;
  article_id = this.datum.article_id;

  ngOnInit(): void {
    this.knowledgeService.getAllCourses().subscribe(
      (response:any) =>{
        this.courses = response;
        // console.log(response);
        this.filterData("");
      }
    )
    
    this.logger.logData("uf-addtocourse", this);
    // console.log(this);
  }

  
  filterData(keyword){
    // console.log(keyword);
    this.filteredCourses = [];
    this.courses.forEach(element => {
      if (element["label"].toLowerCase().includes(keyword.toLowerCase())){
        this.filteredCourses.push(element);
      }
    });
  }

  article_link;
  isLoading = false;
  selectedCourse;
  addToCourse(course_id, course_label){
    this.isLoading = true;
    this.datum.selected_course = course_id;
    this.knowledgeService.addArticleToCourse(course_id, this.article_id).subscribe(
      response => {
        // console.log(response);
        this.selectedCourse = course_label;
        this.isLoading = false;
        this.article_link = "path/"+course_id+"/"+this.article_id;
        this.dialogRef.close({ reload: true });
        // window.location.reload();
      }
    )
    // console.log(course_id, this.article_id);
  }

  seeDetails(course) {
    // this.router.paramMap.subscribe(
    //   params => {
    //     console.log(params);
    //   }
    // )
    // console.log("Open modal")
    const dialogRef = this.dialog.open(ArticleListComponent, {
      data: { category: course },
      minWidth: '320px',
      width: '40%'
    });
  }
}
