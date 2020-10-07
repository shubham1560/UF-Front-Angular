import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/knowledgeservice/knowledge.service';
import { MatDialog } from '@angular/material';
import { ArticleListComponent } from '../article-list/article-list.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  constructor(
    private knowledgeService: DataService,
    private dialog: MatDialog
  ) { }

  courses;
  filteredCourses = [];
  name;
  input;
  ngOnInit(): void {
    this.knowledgeService.getAllCourses().subscribe(
      (response:any) =>{
        this.courses = response;
        // console.log(response);
        this.filterData("");
      }
    )
    
    console.log(this);
  }


  call(){
    console.log("called");  
  }


  check_user = function(w){
    console.log(w);
  }
  filterData(keyword){
    console.log(keyword);
    this.filteredCourses = [];
    this.courses.forEach(element => {
      if (element["label"].toLowerCase().includes(keyword.toLowerCase())){
        this.filteredCourses.push(element);
      }
    });
  }
  
  addToCourse(id){
    console.log(id);
  }

  seeDetails(course) {
    // console.log("Open modal")
    const dialogRef = this.dialog.open(ArticleListComponent, {
      data: { category: course },
      minWidth: '320px',
      width: '40%'
    });
  }
}
