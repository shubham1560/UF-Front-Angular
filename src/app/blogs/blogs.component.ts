import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

  // constructor() { }

  icon="menu";

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit() {
  }

  // ngOnDestroy(){
  //   this.mobileQuery.removeListener(this._mobileQueryListener);
  // }

  // closeNav(){
  //   document.getElementById("mySidenav").style.width = "0";
  //   document.getElementById("main").style.marginLeft = "0px";

  // }

  openNav(){
    this.icon = "menu";
    document.getElementById("sidebar").classList.toggle("active")
    if(document.getElementById("sidebar").classList["value"] == "active"){
      this.icon = "close";
    }
  }


}
