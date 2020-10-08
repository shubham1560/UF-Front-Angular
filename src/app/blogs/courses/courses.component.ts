import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from 'src/app/services/knowledgeservice/knowledge.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ArticleListComponent } from '../article-list/article-list.component';
import { ActivatedRoute } from '@angular/router';

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
    public dialogRef: MatDialogRef<CoursesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  courses;
  filteredCourses = [];
  name;
  input;
  article_id = this.data.article_id;

  ngOnInit(): void {
    this.knowledgeService.getAllCourses().subscribe(
      (response:any) =>{
        this.courses = response;
        // console.log(response);
        this.filterData("");
      }
    )
    
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
  addToCourse(course_id){
    this.isLoading = true;
    this.knowledgeService.addArticleToCourse(course_id, this.article_id).subscribe(
      response => {
        // console.log(response);
        this.isLoading = false;
        this.article_link = "courses/"+course_id+"/"+this.article_id;
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
