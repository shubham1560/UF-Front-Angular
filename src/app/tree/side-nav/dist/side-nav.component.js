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
    function SideNavComponent(route) {
        this.route = route;
        this.icon = "menu";
        this.view = "course";
        this.viewChangeValid = true;
    }
    SideNavComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap.subscribe(function (result) {
            _this.viewChangeValid = true;
            if (result.params.kb_category != "root") {
                _this.viewChangeValid = false;
            }
        });
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
    SideNavComponent.prototype.openNav = function () {
        this.icon = "menu";
        document.getElementById("sidebar").classList.toggle("active");
        if (document.getElementById("sidebar").classList["value"] == "active") {
            this.icon = "close";
        }
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
