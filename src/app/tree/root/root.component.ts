import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DataService } from 'src/app/services/knowledgeservice/knowledge.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArticleListComponent } from 'src/app/blogs/article-list/article-list.component';
import { MediaMatcher } from '@angular/cdk/layout';
import { AddpathorbranchComponent } from "../addpathorbranch/addpathorbranch.component"
import { UserprofileService } from 'src/app/services/userprofile/userprofile.service';
import { AuthService } from 'src/app/services/authservice/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  icon = "menu";

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loggerService: LoggerService,
    private knowledgeService: DataService,
    public dialog: MatDialog,
    private userService: UserprofileService,
    private authService: AuthService,
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  colorArray = ["#ffcccc", "#ccffcc", "#ffccff", "#e8e3e8", "#ccffff", "#f2ffcc", "#e0ebeb", "#ecd9c6", "#d6e0f5", "#ffccf2"]

  viewChangeValid = true;
  view = "course";
  myColor = this.colorArray[Math.floor(Math.random() * 10)];
  categories;
  imageLoaded = false;
  startLoadingImages = false;
  isLoading = true;
  kb_base;
  kb_category;
  isModerator = false;
  _categories = [];
  _courses = [];


  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.userService.inGroup("Moderators").subscribe(
        (result: any) => {
          this.isModerator = result;
          if(this.isModerator){
            this.getUserData();
          }
        }
      )
    }
    this.route.paramMap.subscribe(
      (result: any) => {
        // console.log(result);
        this.isLoading = true;
        this.view = result.params.view;
        if (localStorage.getItem("view")) {
          this.view = localStorage.getItem("view")
          //   // console.log("if working: "+ this.view);
        }
        this.kb_base = result.params.kb_base;
        this.kb_category = result.params.kb_category;
        this.knowledgeService.getRelatedCategories(result.params.kb_base, result.params.kb_category, this.view).subscribe(
          (result: any) => {
            this.categories = result.categories;
            this.getTheCategoryandCourses();
            this.isLoading = false;
          }
        )
      }
    )
    this.loggerService.logData("uf-roots", this);
  }


  getTheCategoryandCourses(){
    this._courses=[];
    this._categories=[];
    this.categories.forEach(element => {
      if(element.course){
        this._courses.push(element);
      }
      else{
        this._categories.push(element);
      }
    });
  }

  moderator_email;
  getUserData(){
    this.userService.getUserData().subscribe(
      (result:any)=>{
        // console.log(result);
        this.moderator_email = result.user.email;
      }
    )
  }

  editProduct(product, type){
    const dialogRef = this.dialog.open(AddpathorbranchComponent, {
      data: { add: type, product: product },
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // console.log(result);
      if(result?.reload){
        window.location.reload();
      }
      
      // this.ngOnInit();
    });
  }

  openDialog(type) {
    const dialogRef = this.dialog.open(AddpathorbranchComponent, {
      data: { add: type, kb_base: this.kb_base, kb_category: this.kb_category },
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // console.log(result);
      if(result?.reload){
        window.location.reload();
      }
      
      // window.location.reload();
      // this.ngOnInit();
    });
  }

  // changeView(changedView){
  //   console.log(changedView);
  //   if(changedView=="tree"){
  //     this.view = "tree";
  //   }
  //   else if(changedView=="course"){
  //     this.view = "course";
  //   }
  //   localStorage.setItem("view", this.view);
  // }



  seeDetails(course) {
    // console.log("Open modal")
    const dialogRef = this.dialog.open(ArticleListComponent, {
      data: { category: course },
      minWidth: '320px',
      width: '40%'
    });
  }

  navigate(url) {
    this.router.navigateByUrl("/path/" + url);
  }

  openNav() {
    this.icon = "menu";
    document.getElementById("sidebar").classList.toggle("active")
    if (document.getElementById("sidebar").classList["value"] == "active") {
      this.icon = "close";
    }
  }

}
