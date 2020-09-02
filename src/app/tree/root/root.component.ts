import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DataService } from 'src/app/services/knowledgeservice/knowledge.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggerService } from 'src/app/services/cx-menu/realtimelogger.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArticleListComponent } from 'src/app/blogs/article-list/article-list.component';
import { MediaMatcher } from '@angular/cdk/layout';


@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  icon="menu";

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loggerService: LoggerService,
    private knowledgeService: DataService,
    public dialog: MatDialog,
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
  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (result: any) => {
        console.log(result);
        this.isLoading = true;
        this.view = result.params.view;
        if(localStorage.getItem("view")){
          this.view = localStorage.getItem("view")
        //   // console.log("if working: "+ this.view);
        }
        // this.viewChangeValid = true;
        // if(result.params.kb_category != "root"){
        //   this.viewChangeValid = false;
        // }
        this.knowledgeService.getRelatedCategories(result.params.kb_base, result.params.kb_category, this.view).subscribe(
          (result: any) => {
            this.categories = result.categories;
            this.isLoading = false;
            setTimeout(() => {
              this.startLoadingImages = true
            }, 50);
            setTimeout(() => {
              this.imageLoaded = true;
            }, 3000);
          }
        )
        // console.log(result);
      }
    )
    this.loggerService.logData("uf-roots", this);
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
    this.router.navigateByUrl("/courses/"+url);
    // window.open("#/courses/" + url)
  }

  openNav(){
    this.icon = "menu";
    document.getElementById("sidebar").classList.toggle("active")
    if(document.getElementById("sidebar").classList["value"] == "active"){
      this.icon = "close";
    }
  }
  
}
