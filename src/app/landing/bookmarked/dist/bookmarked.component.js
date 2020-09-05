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
exports.BookmarkedComponent = void 0;
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var BookmarkedComponent = /** @class */ (function () {
    function BookmarkedComponent(loggerService, userService, dialog, data) {
        this.loggerService = loggerService;
        this.userService = userService;
        this.dialog = dialog;
        this.data = data;
        this.start = 0;
        this.end = 3;
        this.showButton = true;
        this.title = "Recently Bookmarked";
    }
    BookmarkedComponent_1 = BookmarkedComponent;
    BookmarkedComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.data["modal"]) {
            this.end = 0;
            this.showButton = false;
            this.title = "All Bookmarked Articles";
        }
        this.userService.getBookmarkedArticles(this.start, this.end).subscribe(function (result) {
            _this.bookmarkedArticles = result.bookmarked_articles;
        });
        this.loggerService.logData("uf-bookmarked", this);
    };
    BookmarkedComponent.prototype.openAllBookmarkedArticles = function () {
        this.dialog.open(BookmarkedComponent_1, {
            data: { "modal": true }
        });
    };
    var BookmarkedComponent_1;
    BookmarkedComponent = BookmarkedComponent_1 = __decorate([
        core_1.Component({
            selector: 'app-bookmarked',
            templateUrl: './bookmarked.component.html',
            styleUrls: ['./bookmarked.component.scss']
        }),
        __param(3, core_1.Inject(material_1.MAT_DIALOG_DATA))
    ], BookmarkedComponent);
    return BookmarkedComponent;
}());
exports.BookmarkedComponent = BookmarkedComponent;
