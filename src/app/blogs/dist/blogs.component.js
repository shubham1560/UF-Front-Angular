"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BlogsComponent = void 0;
var core_1 = require("@angular/core");
var BlogsComponent = /** @class */ (function () {
    function BlogsComponent(changeDetectorRef, media) {
        // constructor() { }
        this.icon = "menu";
        this.mobileQuery = media.matchMedia('(max-width: 768px)');
        this._mobileQueryListener = function () { return changeDetectorRef.detectChanges(); };
        this.mobileQuery.addListener(this._mobileQueryListener);
    }
    BlogsComponent.prototype.ngOnInit = function () {
    };
    // ngOnDestroy(){
    //   this.mobileQuery.removeListener(this._mobileQueryListener);
    // }
    // closeNav(){
    //   document.getElementById("mySidenav").style.width = "0";
    //   document.getElementById("main").style.marginLeft = "0px";
    // }
    BlogsComponent.prototype.openNav = function () {
        this.icon = "menu";
        document.getElementById("sidebar").classList.toggle("active");
        if (document.getElementById("sidebar").classList["value"] == "active") {
            this.icon = "close";
        }
    };
    BlogsComponent = __decorate([
        core_1.Component({
            selector: 'app-blogs',
            templateUrl: './blogs.component.html',
            styleUrls: ['./blogs.component.scss']
        })
    ], BlogsComponent);
    return BlogsComponent;
}());
exports.BlogsComponent = BlogsComponent;
