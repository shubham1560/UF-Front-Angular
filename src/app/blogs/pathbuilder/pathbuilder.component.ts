import { Component, OnInit } from '@angular/core';
import { UserprofileService } from 'src/app/services/userprofile/userprofile.service';
import { AuthService } from 'src/app/services/authservice/auth.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/knowledgeservice/knowledge.service';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pathbuilder',
  templateUrl: './pathbuilder.component.html',
  styleUrls: ['./pathbuilder.component.scss']
})
export class PathbuilderComponent implements OnInit {

  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi',
    'Episode IX – The Rise of Skywalker'
  ];

  drop(event: CdkDragDrop<string[]>) {
    // console.log(event);
    moveItemInArray(this.flatSectionAndArticles, event.previousIndex, event.currentIndex);

    // console.log(this.flatSectionAndArticles);

  }

  course;
  sectionAndArticles;
  flatSectionAndArticles: any[];
  newSection;


  constructor(
    private userService: UserprofileService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private knowledgeService: DataService,
    private logger: LoggerService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

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
            this.getSectionAndArticles();
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

  getSectionAndArticles() {
    this.knowledgeService.getRelatedSectionAndArticles(this.course).subscribe(
      (response: any) => {
        // console.log(response);
        // return response;
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
      this.knowledgeService.buildPathForCourse(this.course, heir).subscribe(
        (result: any) => {
          this.getSectionAndArticles();
          this.isLoading = false;
          this._snackBar.open("Saved successfully!", '');
        },
        error =>{
          this._snackBar.open("Some error occured! Please try again!", '');
          this.isLoading = false;
        }
      )
    }
  }

}
