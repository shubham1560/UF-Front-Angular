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
import { AssignPathComponent } from '../assign-path/assign-path.component';
import { CacheserviceService } from 'src/app/services/cacheservice/cacheservice.service';


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
    private cache: CacheserviceService,
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
  root_admin = false;


  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.userService.inGroup("Moderators").subscribe(
        (result: any) => {
          this.isModerator = result;
          if (this.isModerator) {
            this.getUserData();
          }
        }
      )
      this.userService.inGroup("Root Admin").subscribe(
        (result: any) => {
          this.root_admin = result;
        }
      )
    }
    this.route.paramMap.subscribe(
      (result: any) => {
        this.isLoading = true;
        this.view = result.params.view;
        if (localStorage.getItem("view")) {
          this.view = localStorage.getItem("view")
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


  getTheCategoryandCourses() {
    this._courses = [];
    this._categories = [];
    this.categories.forEach(element => {
      if (element.course) {
        this._courses.push(element);
      }
      else {
        this._categories.push(element);
      }
    });
  }

  moderator_id;
  getUserData() {
    this.userService.getUserData().subscribe(
      (result: any) => {
        this.moderator_id = result.user.id_name;
      }
    )
  }

  editProduct(product, type) {
    const dialogRef = this.dialog.open(AddpathorbranchComponent, {
      minWidth: '280px',
      data: { add: type, product: product },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.reload) {
        this.cache.deleteAll();
        this.ngOnInit();
      }
    });
  }

  openDialog(type) {
    const dialogRef = this.dialog.open(AddpathorbranchComponent, {
      minWidth: '280px',
      data: { add: type, kb_base: this.kb_base, kb_category: this.kb_category },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.reload) {
        this.cache.deleteAll();
        this.ngOnInit();
      }
    });
  }

  changeModerator(product) {
    console.log(product);
    if (this.root_admin) {
      const dialogRef = this.dialog.open(AssignPathComponent, {
        data: { path: product }
      })

      dialogRef.afterClosed().subscribe(
        result=>{
          this.cache.deleteAll();
          this.ngOnInit();
        }
      )
    }
  }


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
