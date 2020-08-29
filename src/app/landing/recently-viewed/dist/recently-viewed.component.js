"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RecentlyViewedComponent = void 0;
var core_1 = require("@angular/core");
var read_articles_component_1 = require("../read-articles/read-articles.component");
var RecentlyViewedComponent = /** @class */ (function () {
    function RecentlyViewedComponent(userProfileService, loggerService, dialog) {
        this.userProfileService = userProfileService;
        this.loggerService = loggerService;
        this.dialog = dialog;
        this.fetchedAllArticles = false;
        this.start = 0;
        this.numberOfArticlesToFetch = 3;
        this.end = this.start + this.numberOfArticlesToFetch;
        this.isLoading = true;
    }
    RecentlyViewedComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userProfileService.getUserReadArticle(this.start, this.end).subscribe(function (result) {
            _this.articles = result;
            _this.isLoading = false;
        });
        this.loggerService.logData("uf-recently-viewed", this);
    };
    RecentlyViewedComponent.prototype.openAllReadArticles = function () {
        this.dialog.open(read_articles_component_1.ReadArticlesComponent, {});
    };
    RecentlyViewedComponent = __decorate([
        core_1.Component({
            selector: 'app-recently-viewed',
            templateUrl: './recently-viewed.component.html',
            styleUrls: ['./recently-viewed.component.scss']
        })
    ], RecentlyViewedComponent);
    return RecentlyViewedComponent;
}());
exports.RecentlyViewedComponent = RecentlyViewedComponent;
