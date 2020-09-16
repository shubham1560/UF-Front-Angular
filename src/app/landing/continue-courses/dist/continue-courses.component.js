"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ContinueCoursesComponent = void 0;
var core_1 = require("@angular/core");
var ContinueCoursesComponent = /** @class */ (function () {
    function ContinueCoursesComponent(userService, loggerService) {
        this.userService = userService;
        this.loggerService = loggerService;
    }
    ContinueCoursesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getUserStartedCourse(0, 10).subscribe(function (result) {
            _this.courses = result;
        });
        this.loggerService.logData("uf-recently-viewed-course", this);
    };
    ContinueCoursesComponent = __decorate([
        core_1.Component({
            selector: 'app-continue-courses',
            templateUrl: './continue-courses.component.html',
            styleUrls: ['./continue-courses.component.scss']
        })
    ], ContinueCoursesComponent);
    return ContinueCoursesComponent;
}());
exports.ContinueCoursesComponent = ContinueCoursesComponent;
