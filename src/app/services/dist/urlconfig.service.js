"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UrlconfigService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var UrlconfigService = /** @class */ (function () {
    // base_url = "https://uf-preprod.herokuapp.com/";          //preprod
    function UrlconfigService(cookieService) {
        this.cookieService = cookieService;
        // base_url = "http://127.0.0.1:8000/";           //local
        this.base_url = "https://database1560.herokuapp.com/"; //dev
    }
    UrlconfigService.prototype.getUrl = function () {
        return this.base_url;
    };
    UrlconfigService.prototype.getFileUploadHeader = function () {
        var token = this.cookieService.get('token');
        return new http_1.HttpHeaders({
            'Content-Type': 'multipart/form-data; charset=utf-8; boundary="another cool boundary',
            Authorization: "Token " + token
        });
    };
    UrlconfigService.prototype.getHeader = function () {
        if (this.isLoggedIn()) {
            return this.getAuthenticationHeader();
        }
        return this.getUnauthenticatedHeader();
    };
    UrlconfigService.prototype.getUnauthenticatedHeader = function () {
        return new http_1.HttpHeaders({
            'Content-Type': 'application/json'
        });
    };
    UrlconfigService.prototype.getAuthenticationHeader = function () {
        var token = this.cookieService.get('token');
        return new http_1.HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: "Token " + token
        });
    };
    UrlconfigService.prototype.isLoggedIn = function () {
        if (this.cookieService.get('token')) {
            if (this.cookieService.get('token') == localStorage.getItem('token')) {
                return true;
            }
        }
        return false;
    };
    UrlconfigService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UrlconfigService);
    return UrlconfigService;
}());
exports.UrlconfigService = UrlconfigService;
