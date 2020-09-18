"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.ArticleListComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var loginprompt_component_1 = require("src/app/auth/loginprompt/loginprompt.component");
var ArticleListComponent = /** @class */ (function () {
    function ArticleListComponent(knowledgeService, dataLogger, route, router, authService, dialogRef, course_for_modal, dialog) {
        this.knowledgeService = knowledgeService;
        this.dataLogger = dataLogger;
        this.route = route;
        this.router = router;
        this.authService = authService;
        this.dialogRef = dialogRef;
        this.course_for_modal = course_for_modal;
        this.dialog = dialog;
        this.data = {
            "addon": false
        };
        this.course = "";
        this.panelOpenState = false;
        this.signedIn = true;
        this.counter = 0;
    }
    ArticleListComponent.prototype.ngOnInit = function () {
        // debugger;
        var _this = this;
        this.route.paramMap.subscribe(function (result) {
            if (_this.course_for_modal.category) {
                // For modal for overview section
                _this.course = _this.course_for_modal.category;
                //the data we passed from the course page passed onto this page
            }
            else {
                _this.course = result.get("category");
            }
            _this.article = result.get("article");
            if (_this.course != _this.courseInit) {
                // console.log("called time")
                _this.changeTheCourse();
            }
        });
        // console.log("Init-called------------------"+ this.article);
        this.courseInit = this.course;
        //At the end to get the data from the component, any time the data changes, the realtime data can be seen
        this.dataLogger.logData("articlelist", this);
    };
    ArticleListComponent.prototype.changeTheCourse = function () {
        // console.log('change the course called------------------');
        var _this = this;
        this.knowledgeService.getRelatedSectionAndArticles(this.course).subscribe(function (response) {
            _this.courseName = response.course;
            _this.sections = response.sections;
            if (!_this.article) {
                _this.article = _this.sections[0].articles[0].id;
                if (!_this.course_for_modal.category) {
                    _this.navigate(_this.article);
                }
            }
            if (_this.article) {
                _this.markViewed(_this.article);
            }
            ;
        }, function (error) {
            _this.data["error"] = error;
        });
    };
    ArticleListComponent.prototype.navigate = function (article_id) {
        // console.log("navigation called -----------------------");
        var url = "courses/" + this.course + "/" + article_id;
        this.markViewed(article_id);
        if (this.course_for_modal.category) {
            window.open("#/" + url);
        }
        else {
            this.router.navigate(['courses', this.course, article_id]);
        }
    };
    ArticleListComponent.prototype.openLoginPrompt = function () {
        var dialogRef = this.dialog.open(loginprompt_component_1.LoginpromptComponent);
    };
    ArticleListComponent.prototype.goBack = function () {
        // console.log("going back")
    };
    ArticleListComponent.prototype.markViewed = function (article_id) {
        var _this = this;
        // console.log("called viewed ------------------" + this.article)
        var totalNumArticles = 0;
        var totalReadArticles = 0;
        this.sections.forEach(function (section) {
            section.active = false;
            section.doneAll = true;
            var totalSectionArticles = 0;
            var totalSectionReadArticles = 0;
            section.articles.forEach(function (article) {
                totalNumArticles += 1;
                totalReadArticles += 1;
                totalSectionArticles += 1;
                totalSectionReadArticles += 1;
                article.active = false;
                if (article.id == article_id) {
                    section.active = true;
                    if (_this.authService.isLoggedIn() && !_this.course_for_modal.category) {
                        article.viewed = true;
                    }
                    article.active = true;
                }
                if (article.viewed == false) {
                    totalReadArticles -= 1;
                    totalSectionReadArticles -= 1;
                    section.doneAll = false;
                }
                section.progress = Math.round((totalSectionReadArticles / totalSectionArticles) * 100);
                if (!_this.authService.isLoggedIn()) {
                    section.progress = undefined;
                }
            });
        });
        this.progress = Math.round((totalReadArticles / totalNumArticles) * 100);
        // if (this.authService.isLoggedIn() && this.counter == 0) {
        if (this.authService.isLoggedIn()) {
            // console.log("called the progess")
            this.counter += 1;
            this.knowledgeService.setCourseProgress(this.course, this.progress).subscribe(function (result) {
                // console.log("changed the progress");
                // console.log(result)
            }, function (error) {
                // console.log(error);
            });
        }
        if (!this.authService.isLoggedIn()) {
            this.progress = undefined;
            this.signedIn = false;
        }
    };
    ArticleListComponent = __decorate([
        core_1.Component({
            selector: 'app-article-list',
            templateUrl: './article-list.component.html',
            styleUrls: ['./article-list.component.scss']
        }),
        __param(6, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], ArticleListComponent);
    return ArticleListComponent;
}());
exports.ArticleListComponent = ArticleListComponent;
