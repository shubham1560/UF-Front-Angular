"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ArticleDetailComponent = void 0;
var core_1 = require("@angular/core");
var ArticleDetailComponent = /** @class */ (function () {
    function ArticleDetailComponent(route, logger, knowledge) {
        this.route = route;
        this.logger = logger;
        this.knowledge = knowledge;
        this.article = {};
        this.isLoading = true;
        this.image = "";
        this.loadOriginalImage = false;
        this.authorImage = "";
    }
    ArticleDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap.subscribe(function (params) {
            // console.log("changed");
            _this.isLoading = true;
            _this.article_id = params.get('article');
            _this.category = params.get("category");
            if (_this.article_id) {
                _this.knowledge.getArticleById(_this.article_id).subscribe(function (result) {
                    _this.article = result.data;
                    _this.isLoading = false;
                    // console.log(this.article.getAuthor.header_image);
                    // console.log(this.article.getAuthor.google_pic);
                    if (_this.article.getAuthor.google_pic) {
                        _this.authorImage = _this.article.getAuthor.google_pic;
                    }
                    else {
                        _this.authorImage = _this.article.getAuthor.header_image;
                    }
                }, function (error) {
                    _this.article = {};
                    // console.log(error);
                });
            }
        });
        // this.logger.logData("uf-article-detail", this)
        this.logger.logData('uf-article-detail', this);
        setTimeout(function () {
            _this.loadOriginalImage = true;
            // console.log("yo maan");
        }, 6000);
    };
    ArticleDetailComponent = __decorate([
        core_1.Component({
            selector: 'app-article-detail',
            templateUrl: './article-detail.component.html',
            styleUrls: ['./article-detail.component.scss']
        })
    ], ArticleDetailComponent);
    return ArticleDetailComponent;
}());
exports.ArticleDetailComponent = ArticleDetailComponent;
