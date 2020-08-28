"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BreadcrumbsComponent = void 0;
var core_1 = require("@angular/core");
var BreadcrumbsComponent = /** @class */ (function () {
    function BreadcrumbsComponent(route, router, loggerService, KnowledgeService) {
        this.route = route;
        this.router = router;
        this.loggerService = loggerService;
        this.KnowledgeService = KnowledgeService;
        this.view = "course";
        this.isLoading = true;
        this.breadcrumb = ["Home", ""];
        this.breadcrumbLink = ["", ""];
    }
    BreadcrumbsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap.subscribe(function (route) {
            _this.isLoading = true;
            _this.breadcrumb = ["Home", ""];
            _this.breadcrumbLink = ["", ""];
            _this.kb_base = route.get('kb_base');
            _this.kb_category = route.get('kb_category');
            _this.breadcrumb[1] = _this.extractKnowledgeBaseName();
            // if (this.kb_category == "root") {
            _this.breadcrumbLink[1] = "roots/" + _this.kb_base + "/root";
            // }else{
            if (_this.kb_category != "root") {
                _this.KnowledgeService.getBreadCrumbFromCategory(_this.kb_category).subscribe(function (result) {
                    result.labels.forEach(function (element, index, arr) {
                        _this.breadcrumb[index + 2] = element;
                        _this.breadcrumbLink[index + 2] = "roots/" + _this.kb_base + "/" + result.id[index];
                    });
                    _this.isLoading = false;
                });
            }
            else {
                _this.isLoading = false;
            }
            // console.log(this)
        });
        // this.loggerService.logData("uf-breadcrumbs", this);
    };
    BreadcrumbsComponent.prototype.navigateCrumb = function (index) {
        this.router.navigateByUrl(this.breadcrumbLink[index]);
        // window.open();
    };
    BreadcrumbsComponent.prototype.changeView = function (changedView) {
        console.log(changedView);
        if (changedView == "tree") {
            this.view = "tree";
        }
        else if (changedView == "course") {
            this.view = "course";
        }
    };
    BreadcrumbsComponent.prototype.extractKnowledgeBaseName = function () {
        var base = "";
        this.kb_base.split("-").forEach(function (element, index, arr) {
            if (index != (arr.length - 1) || arr.length == 1) {
                base += element + " ";
            }
        });
        return base;
    };
    BreadcrumbsComponent = __decorate([
        core_1.Component({
            selector: 'app-breadcrumbs',
            templateUrl: './breadcrumbs.component.html',
            styleUrls: ['./breadcrumbs.component.scss']
        })
    ], BreadcrumbsComponent);
    return BreadcrumbsComponent;
}());
exports.BreadcrumbsComponent = BreadcrumbsComponent;
