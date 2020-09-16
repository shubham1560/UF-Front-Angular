"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RootComponent = void 0;
var core_1 = require("@angular/core");
var article_list_component_1 = require("src/app/blogs/article-list/article-list.component");
var RootComponent = /** @class */ (function () {
    function RootComponent(route, router, loggerService, knowledgeService, dialog, changeDetectorRef, media) {
        this.route = route;
        this.router = router;
        this.loggerService = loggerService;
        this.knowledgeService = knowledgeService;
        this.dialog = dialog;
        this.icon = "menu";
        this.colorArray = ["#ffcccc", "#ccffcc", "#ffccff", "#e8e3e8", "#ccffff", "#f2ffcc", "#e0ebeb", "#ecd9c6", "#d6e0f5", "#ffccf2"];
        this.viewChangeValid = true;
        this.view = "course";
        this.myColor = this.colorArray[Math.floor(Math.random() * 10)];
        this.imageLoaded = false;
        this.startLoadingImages = false;
        this.isLoading = true;
        this.mobileQuery = media.matchMedia('(max-width: 768px)');
        this._mobileQueryListener = function () { return changeDetectorRef.detectChanges(); };
        this.mobileQuery.addListener(this._mobileQueryListener);
    }
    RootComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap.subscribe(function (result) {
            // console.log(result);
            _this.isLoading = true;
            _this.view = result.params.view;
            if (localStorage.getItem("view")) {
                _this.view = localStorage.getItem("view");
                //   // console.log("if working: "+ this.view);
            }
            // this.viewChangeValid = true;
            // if(result.params.kb_category != "root"){
            //   this.viewChangeValid = false;
            // }
            _this.knowledgeService.getRelatedCategories(result.params.kb_base, result.params.kb_category, _this.view).subscribe(function (result) {
                _this.categories = result.categories;
                _this.isLoading = false;
                setTimeout(function () {
                    _this.startLoadingImages = true;
                }, 50);
                setTimeout(function () {
                    _this.imageLoaded = true;
                }, 3000);
            });
            // console.log(result);
        });
        this.loggerService.logData("uf-roots", this);
    };
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
    RootComponent.prototype.seeDetails = function (course) {
        // console.log("Open modal")
        var dialogRef = this.dialog.open(article_list_component_1.ArticleListComponent, {
            data: { category: course },
            minWidth: '320px',
            width: '40%'
        });
    };
    RootComponent.prototype.navigate = function (url) {
        this.router.navigateByUrl("/courses/" + url);
        // window.open("#/courses/" + url)
    };
    RootComponent.prototype.openNav = function () {
        this.icon = "menu";
        document.getElementById("sidebar").classList.toggle("active");
        if (document.getElementById("sidebar").classList["value"] == "active") {
            this.icon = "close";
        }
    };
    RootComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './root.component.html',
            styleUrls: ['./root.component.scss']
        })
    ], RootComponent);
    return RootComponent;
}());
exports.RootComponent = RootComponent;
