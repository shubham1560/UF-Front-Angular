"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ReadArticlesComponent = void 0;
var core_1 = require("@angular/core");
var ReadArticlesComponent = /** @class */ (function () {
    function ReadArticlesComponent(userProfileService, loggerService) {
        this.userProfileService = userProfileService;
        this.loggerService = loggerService;
        this.fetchedAllArticles = false;
        this.start = 0;
        this.numberOfArticlesToFetch = 4;
        this.end = this.start + this.numberOfArticlesToFetch;
        this.isLoading = true;
    }
    ReadArticlesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userProfileService.getUserReadArticle(this.start, this.end).subscribe(function (result) {
            _this.articles = result;
            _this.isLoading = false;
            // this.start = this.start + this.numberOfArticlesToFetch;
            // this.end = this.start + this.numberOfArticlesToFetch;
        });
        this.loggerService.logData("uf-read-articles", this);
    };
    ReadArticlesComponent.prototype.getNextPage = function () {
        this.fetchArticles(this.start, this.end);
    };
    ReadArticlesComponent.prototype.addBokmark = function (yo) {
        console.log("hola");
    };
    ReadArticlesComponent.prototype.fetchArticles = function (start, end) {
        var _this = this;
        this.userProfileService.getUserReadArticle(start, end).subscribe(function (result) {
            console.log(result);
            if (result.length > 0) {
                _this.articles = _this.articles.concat(result);
            }
            _this.isLoading = false;
            _this.start = _this.start + _this.numberOfArticlesToFetch;
            _this.end = _this.start + _this.numberOfArticlesToFetch;
        });
    };
    ReadArticlesComponent = __decorate([
        core_1.Component({
            selector: 'app-read-articles',
            templateUrl: './read-articles.component.html',
            styleUrls: ['./read-articles.component.scss']
        })
    ], ReadArticlesComponent);
    return ReadArticlesComponent;
}());
exports.ReadArticlesComponent = ReadArticlesComponent;
