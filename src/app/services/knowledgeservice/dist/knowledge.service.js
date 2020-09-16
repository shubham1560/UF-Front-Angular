"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DataService = void 0;
var core_1 = require("@angular/core");
var DataService = /** @class */ (function () {
    function DataService(httpService, urlService) {
        this.httpService = httpService;
        this.urlService = urlService;
        this.base_url = this.urlService.getUrl();
        this.base_knowledge_url = this.base_url + "knowledge/";
    }
    DataService.prototype.getHeader = function () {
        return this.urlService.getHeader();
    };
    DataService.prototype.getAllArticles = function () {
        var url = this.base_knowledge_url + "articles/";
        this.called_url = url;
        return this.httpService.get(url, { headers: this.getHeader() });
    };
    DataService.prototype.getRelatedComments = function (id) {
        var url = this.base_knowledge_url + "articles/" + id + "/comments/";
        this.called_url = url;
        return this.httpService.get(url, { headers: this.getHeader() });
    };
    DataService.prototype.getPaginatedArticles = function (start, end) {
        var url = this.base_knowledge_url + "articles/" + start + "/" + end + "/";
        this.called_url = url;
        return this.httpService.get(url, { headers: this.getHeader() });
    };
    DataService.prototype.getKnowledgeUrl = function () {
        return "" + this.base_knowledge_url;
    };
    DataService.prototype.addBookmarkArticle = function (article_id) {
        this.called_url = this.base_knowledge_url + "bookmark_this_article/";
        var body = { "article_id": article_id };
        return this.httpService.post(this.called_url, body, { headers: this.getHeader() });
    };
    DataService.prototype.getArticleById = function (article_id) {
        this.called_url = this.base_knowledge_url + "articles/" + article_id + "/";
        return this.httpService.get(this.called_url, { headers: this.getHeader() });
    };
    DataService.prototype.postUseArticle = function (article, useful) {
        this.called_url = this.base_knowledge_url + "knowledge_view/";
        var body = { "article": article, 'useful': useful, 'viewed': 'true' };
        return this.httpService.post(this.called_url, body, { headers: this.getHeader() });
    };
    DataService.prototype.ifArticleBookmarkedByUser = function (article_id) {
        if (article_id) {
            this.called_url = this.base_knowledge_url + "knowledge_view/" + article_id + "/";
            return this.httpService.get(this.called_url, { headers: this.getHeader() });
        }
    };
    DataService.prototype.addFeedback = function (article_id, feedback) {
        this.called_url = this.base_knowledge_url + "articles/" + article_id + "/feedback/";
        var body = { "feedback": feedback };
        return this.httpService.post(this.called_url, body, { headers: this.getHeader() });
    };
    DataService.prototype.getKnowledgeBases = function () {
        this.called_url = this.base_knowledge_url + "knowledge_base/get_knowledge_bases/";
        return this.httpService.get(this.called_url, { headers: this.getHeader() });
    };
    DataService.prototype.getRelatedCategories = function (kb_base, kb_category, course) {
        if (course == "course") {
            this.called_url = "" + this.base_knowledge_url + kb_base + "/categories/" + kb_category + "/courses/";
        }
        else {
            this.called_url = "" + this.base_knowledge_url + kb_base + "/categories/" + kb_category + "/tree/";
        }
        return this.httpService.get(this.called_url, { headers: this.getHeader() });
    };
    DataService.prototype.getRelatedSectionAndArticles = function (kb_category) {
        this.called_url = this.base_knowledge_url + "course/" + kb_category + "/";
        return this.httpService.get(this.called_url, { headers: this.getHeader() });
    };
    DataService.prototype.getBreadCrumbFromCategory = function (category) {
        this.called_url = this.base_knowledge_url + "knowledge_crumb/" + category + "/";
        return this.httpService.get(this.called_url, { headers: this.getHeader() });
    };
    DataService.prototype.setCourseProgress = function (course, progress) {
        this.called_url = this.base_knowledge_url + "course_progress/";
        var body = { 'course': course, 'progress': progress };
        return this.httpService.post(this.called_url, body, { headers: this.getHeader() });
    };
    DataService.prototype.getCategoriesForSideNav = function (kb_base) {
        this.called_url = "" + this.base_knowledge_url + kb_base + "/categories_kb_base";
        return this.httpService.get(this.called_url, { headers: this.getHeader() });
    };
    DataService.prototype.getSearchResults = function (query_key) {
        this.called_url = this.base_knowledge_url + "query/" + query_key;
        return this.httpService.get(this.called_url, { headers: this.getHeader() });
    };
    DataService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
