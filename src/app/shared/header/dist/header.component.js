"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HeaderComponent = void 0;
var core_1 = require("@angular/core");
var search_results_component_1 = require("../search-results/search-results.component");
var forms_1 = require("@angular/forms");
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(authService, loggerService, dialog, fb, knowledgeService) {
        this.authService = authService;
        this.loggerService = loggerService;
        this.dialog = dialog;
        this.fb = fb;
        this.knowledgeService = knowledgeService;
        this.user = {};
        this.image = false;
    }
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isLoggedIn = this.authService.isLoggedIn();
        if (this.isLoggedIn) {
            // console.log("calling func");
            this.authService.getLoggedInUserDetail().subscribe(function (response) {
                _this.user = response.user;
                // console.log(_this.user);
                if (_this.user.profile_pic) {
                    _this.image = _this.user.profile_pic;
                }
                if (_this.user.profile) {
                    _this.image = _this.user.profile;
                }
            }, function (error) {
                _this.error = error;
            });
        }
        this.knowledgeService.getKnowledgeBases().subscribe(function (result) {
            _this.roots = (result.bases);
        }, function (error) {
            // console.log(error);
        });
        this.searchQueryForm = this.fb.group({
            query: ['', [forms_1.Validators.required, forms_1.Validators.minLength(1)]]
        });
        this.loggerService.logData("uf-header", this);
    };
    HeaderComponent.prototype.searchResults = function () {
        var queryParm = this.searchQueryForm.get('query');
        if (queryParm.valid) {
            var dialogRef = this.dialog.open(search_results_component_1.SearchResultsComponent, {
                data: {
                    query: queryParm.value
                }
            });
        }
    };
    HeaderComponent.prototype.logout = function () {
        this.authService.logoutUser();
    };
    HeaderComponent.prototype.sendToLoginPage = function () {
        localStorage.setItem("redirect_url", window.location.href);
    };
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'app-header',
            templateUrl: './header.component.html',
            styleUrls: ['./header.component.scss']
        })
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
