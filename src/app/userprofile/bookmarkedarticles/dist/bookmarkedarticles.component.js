"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BookmarkedarticlesComponent = void 0;
var core_1 = require("@angular/core");
var table_1 = require("@angular/material/table");
var paginator_1 = require("@angular/material/paginator");
var BookmarkedarticlesComponent = /** @class */ (function () {
    function BookmarkedarticlesComponent(userprofile, loggerService) {
        this.userprofile = userprofile;
        this.loggerService = loggerService;
        this.ghostEl = 3;
        this.response = {};
        this.error = {};
        this.bookmarkedArticles = [];
        this.displayedColumns = ['position'];
        this.isLoading = true;
    }
    BookmarkedarticlesComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    };
    BookmarkedarticlesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userprofile.getBookmarkedArticles(0, 3).subscribe(function (result) {
            _this.response = result;
            _this.bookmarkedArticles = _this.response.bookmarked_articles;
            var dataSource = new table_1.MatTableDataSource(_this.bookmarkedArticles);
            _this.dataSource = dataSource;
            _this.dataSource.paginator = _this.paginator;
            // console.log(_this.dataSource);
            _this.isLoading = false;
            // console.log(_this);
        }, function (error) {
            _this.error = error;
        });
    };
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator, { static: true })
    ], BookmarkedarticlesComponent.prototype, "paginator");
    BookmarkedarticlesComponent = __decorate([
        core_1.Component({
            selector: 'app-bookmarkedarticles',
            templateUrl: './bookmarkedarticles.component.html',
            styleUrls: ['./bookmarkedarticles.component.scss']
        })
    ], BookmarkedarticlesComponent);
    return BookmarkedarticlesComponent;
}());
exports.BookmarkedarticlesComponent = BookmarkedarticlesComponent;
