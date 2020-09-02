"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SideNavComponent = void 0;
var core_1 = require("@angular/core");
var SideNavComponent = /** @class */ (function () {
    function SideNavComponent(route, knowledgeService, loggerService) {
        this.route = route;
        this.knowledgeService = knowledgeService;
        this.loggerService = loggerService;
        this.icon = "menu";
        this.view = "course";
        this.viewChangeValid = true;
        this.categories = [];
    }
    SideNavComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap.subscribe(function (result) {
            _this.view = result.params.view;
            if (localStorage.getItem("view")) {
                _this.view = localStorage.getItem("view");
            }
            _this.viewChangeValid = true;
            if (result.params.kb_category != "root") {
                _this.viewChangeValid = false;
            }
            _this.knowledgeService.getCategoriesForSideNav(result.params.kb_base).subscribe(function (result) {
                _this.categories = result;
                // console.log(result);
            });
        });
        this.loggerService.logData("uf-side-nav", this);
    };
    SideNavComponent.prototype.changeView = function (changedView) {
        console.log(changedView);
        if (changedView == "tree") {
            this.view = "tree";
        }
        else if (changedView == "course") {
            this.view = "course";
        }
        localStorage.setItem("view", this.view);
    };
    SideNavComponent = __decorate([
        core_1.Component({
            selector: 'app-side-nav',
            templateUrl: './side-nav.component.html',
            styleUrls: ['./side-nav.component.scss']
        })
    ], SideNavComponent);
    return SideNavComponent;
}());
exports.SideNavComponent = SideNavComponent;
