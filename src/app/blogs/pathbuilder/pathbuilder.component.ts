import { Component, OnInit } from '@angular/core';
import { UserprofileService } from 'src/app/services/userprofile/userprofile.service';
import { AuthService } from 'src/app/services/authservice/auth.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/knowledgeservice/knowledge.service';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-pathbuilder',
  templateUrl: './pathbuilder.component.html',
  styleUrls: ['./pathbuilder.component.scss']
})
export class PathbuilderComponent implements OnInit {

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.flatSectionAndArticles, event.previousIndex, event.currentIndex);
  }


  course;
  sectionAndArticles;
  flatSectionAndArticles: any[];
  newSection;
  courseName;

  constructor(
    private userService: UserprofileService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private knowledgeService: DataService,
    private logger: LoggerService,
    private _snackBar: MatSnackBar,
    private titleService: Title,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Path Builder")
    this.route.paramMap.subscribe(
      (params: any) => {
        // console.log(params);
        this.course = params.get("category");

      }
    )

    if (this.authService.isLoggedIn()) {
      this.userService.inGroup("Moderators").subscribe(
        (response: Boolean) => {
          if (response) {
            this.courseOwner();
          }
          else {
            window.location.href = "welcome";
            return false;
          }
        }, error => {
          return false;
        }
      )
    }
    else {
      window.location.href = "welcome";
    }
    this.logger.logData("uf-path", this);
  }

  courseOwner(){
    this.knowledgeService.ifCourseOwner(this.course).subscribe(
      (result:any)=>{
        // console.log(result);
        if(result.owner){
          this.getSectionAndArticles();
          this.courseName = result.course;
        }
        else{
          window.location.href = "/welcome";
          // alert("You are not the owner of this course");
        }
      }, error =>{
        window.location.href = "/welcome";
        // console.log(error);
        
      }
    )
  }

  getSectionAndArticles() {
    this.knowledgeService.getRelatedSectionAndArticles(this.course).subscribe(
      (response: any) => {
        this.sectionAndArticles = response;
        this.convertToArray(this.sectionAndArticles.sections);
      }, error => { }
    )
  }

  convertToArray(sections) {
    var finArray = []
    sections.forEach(element => {
      finArray.push({
        "id": element.id,
        "label": element.label,
        "order": element.order,
        "type": "section",
        "articles": []
      });
      element.articles.forEach(element => {
        finArray.push({
          "id": element.id,
          "label": element.title,
          "section": element.section,
          "order": element.order,
          "type": "article"
        });
      });
    });
    this.flatSectionAndArticles = finArray;
    // console.log(finArray);
  }

  addSection() {
    // alert(this.newSection)
    if (this.newSection) {
      this.flatSectionAndArticles.push({
        "label": this.newSection,
        "type": "section",
        "order": null,
        "articles": []
      })
    }
    else {
      this._snackBar.open('Please type the name of the section', "", {
        duration: 2000,
      });
    }
  }
  isLoading = false;

  finalPathStructure() {
    // console.log(this.flatSectionAndArticles);
    this.isLoading = true;
    var heir = []
    var sectionOrder = 100;
    var articleOrder = 100;
    var valid = true;
    this.flatSectionAndArticles.forEach(element => {
      if (element.type == 'section') {
        element.order = sectionOrder;
        sectionOrder += 100;
        element.articles = [];
        heir.push(element);
      }
      if (element.type == 'article') {
        element.order = articleOrder;
        articleOrder += 100;
        if (heir.length >= 1) {
          heir[heir.length - 1].articles.push(element);
        }
        else {
          this._snackBar.open("The path can't start with article, please add section on top", "", {
            duration: 2000,
            horizontalPosition: "right",
            verticalPosition: "top",
          });
          this.isLoading = false;
          valid = false;
          return;
        }
      }
    })
    // console.log(heir);
    if (valid) {
      this.knowledgeService.buildPathForCourse(this.course, heir, this.deleteSectionArray).subscribe(
        (result: any) => {
          // console.log(heir);
          this.getSectionAndArticles();
          this.isLoading = false;

          this._snackBar.open("Saved successfully!", '', {
            duration: 2000,
          });
        },
        error =>{
          this._snackBar.open("Some error occured! Please try again!", '', {
            duration: 5000,
          });
          this.isLoading = false;
        }
      )
    }
  }

  deleteSectionArray = [];

  deleteSection(element, index){
    // console.log(element);
    this.flatSectionAndArticles.splice(index, 1);
    if(element.id){
      this.deleteSectionArray.push(element.id)
    }
    // console.log(this.deleteSectionArray);
    // console.log(this.flatSectionAndArticles);
  }

  resetStructure(){
    this.getSectionAndArticles();
  }

}
