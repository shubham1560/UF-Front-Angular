"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ExplorerootsComponent = void 0;
var core_1 = require("@angular/core");
var ExplorerootsComponent = /** @class */ (function () {
    function ExplorerootsComponent(knowledgeServie, authService, loggerService) {
        this.knowledgeServie = knowledgeServie;
        this.authService = authService;
        this.loggerService = loggerService;
        this.myColor = "#8dbcaa";
        this.dataLoading = true;
        this.imageLoaded = false;
        this.startLoadingImages = false;
        this.isLoggedIn = false;
    }
    ExplorerootsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.knowledgeServie.getKnowledgeBases().subscribe(function (result) {
            console.log(result);
            _this.products = result.bases;
            _this.dataLoading = false;
            setTimeout(function () {
                _this.startLoadingImages = true;
            }, 50);
            setTimeout(function () {
                _this.imageLoaded = true;
            }, 3000);
        }, function (error) {
            console.log(error);
        });
        if (this.authService.isLoggedIn()) {
            this.isLoggedIn = true;
        }
        this.loggerService.logData("uf-exploreroots", this);
    };
    ExplorerootsComponent = __decorate([
        core_1.Component({
            selector: 'app-exploreroots',
            templateUrl: './exploreroots.component.html',
            styleUrls: ['./exploreroots.component.scss']
        })
    ], ExplorerootsComponent);
    return ExplorerootsComponent;
}());
exports.ExplorerootsComponent = ExplorerootsComponent;
