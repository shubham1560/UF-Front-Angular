"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserprofileService = void 0;
var core_1 = require("@angular/core");
var UserprofileService = /** @class */ (function () {
    function UserprofileService(urlService, httpService, knowledgeService) {
        this.urlService = urlService;
        this.httpService = httpService;
        this.knowledgeService = knowledgeService;
        this.base_url = this.urlService.getUrl();
        this.base_userprofile_url = this.base_url + "userprofile/";
        this.header = this.urlService.getHeader();
        this.body = {};
    }
    UserprofileService.prototype.getUserData = function () {
        this.url = this.base_userprofile_url + "get_user_data/";
        return this.httpService.get(this.url, { headers: this.header });
    };
    UserprofileService.prototype.deleteUser = function () {
        this.url = this.base_userprofile_url + "get_user_data/";
        this.body = { "delete": "true" };
        return this.httpService.post(this.url, this.body, { headers: this.header });
    };
    UserprofileService.prototype.getBookmarkedArticles = function (start, end) {
        this.url = this.knowledgeService.getKnowledgeUrl() + "bookmarked_articles/" + start + "/" + end + "/";
        return this.httpService.get(this.url, { headers: this.header });
    };
    UserprofileService.prototype.editUserData = function (user_data) {
        this.url = this.base_userprofile_url + "edit_user_data/";
        var body = { "first_name": user_data.first_name,
            "last_name": user_data.last_name,
            "about": user_data.about
        };
        return this.httpService.post(this.url, body, { headers: this.header });
    };
    UserprofileService.prototype.getUserReadArticle = function (start, end) {
        this.url = this.base_userprofile_url + "get_user_activity/articles/" + start + "/" + end + "/";
        return this.httpService.get(this.url, { headers: this.header });
    };
    UserprofileService.prototype.getUserStartedCourse = function (start, end) {
        this.url = this.base_userprofile_url + "get_user_activity/courses/" + start + "/" + end + "/";
        return this.httpService.get(this.url, { headers: this.header });
    };
    UserprofileService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UserprofileService);
    return UserprofileService;
}());
exports.UserprofileService = UserprofileService;
