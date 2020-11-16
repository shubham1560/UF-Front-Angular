import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

  // constructor() { }

  well

  icon = "menu";
  loadKbUse = false;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit() {
    // setTimeout(() => {
    //   this.observer();
    //   // console.log(this);
    // }, 500)
  }

  // ngOnDestroy(){
  //   this.mobileQuery.removeListener(this._mobileQueryListener);
  // }

  // closeNav(){
  //   document.getElementById("mySidenav").style.width = "0";
  //   document.getElementById("main").style.marginLeft = "0px";

  // }

  openNav() {
    this.icon = "menu";
    document.getElementById("sidebar").classList.toggle("active")
    if (document.getElementById("sidebar").classList["value"] == "active") {
      this.icon = "close";
    }
  }

  onGettingList(list){
    this.well = list
    console.log(list);
  }

  // callback(entries) {
  //   if (entries[0].isIntersecting) {
  //     // console.log(entries)
  //     // this.loadKbUse = true;
  //     // console.log(this);
  //   }
  // }


  // observer() {
  //   var box = document.getElementById("kbuse-load");
  //   var observer = new IntersectionObserver(this.callback);
  //   observer.observe(box);
  // }
}
