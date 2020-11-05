import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UrlconfigService } from '../urlconfig.service';
import { CacheserviceService } from '../../services/cacheservice/cacheservice.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  base_url = this.urlService.getUrl()

  base_knowledge_url = `${this.base_url}knowledge/`

  called_url: string;

  constructor(private httpService: HttpClient,
    private urlService: UrlconfigService,
    private cache: CacheserviceService,
  ) { }

  getHeader() {
    return this.urlService.getHeader();
  }

  getAllArticles() {
    const url = `${this.base_knowledge_url}articles/`;
    this.called_url = url
    return this.httpService.get(url, { headers: this.getHeader() });
  }

  getRelatedComments(id: string) {
    const url = `${this.base_knowledge_url}articles/${id}/comments/`;
    this.called_url = url;
    return this.httpService.get(url, { headers: this.getHeader() });
  }

  getPaginatedArticles(start: number, end: number) {
    const url = `${this.base_knowledge_url}articles/${start}/${end}/`;
    this.called_url = url;
    return this.httpService.get(url, { headers: this.getHeader() });
  }

  getKnowledgeUrl() {
    return `${this.base_knowledge_url}`;
  }

  addBookmarkArticle(article_id: string) {
    this.called_url = `${this.base_knowledge_url}bookmark_this_article/`;
    const body = { "article_id": article_id };
    this.cache.deleteContaining('bookmarked_articles/');
    return this.httpService.post(this.called_url, body, { headers: this.getHeader() });
  }

  getArticleById(article_id: string) {
    this.called_url = `${this.base_knowledge_url}articles/${article_id}/`;
    // console.log(this.called_url);
    return this.httpService.get(this.called_url, { headers: this.getHeader() });
  }

  postUseArticle(article, useful) {
    this.called_url = `${this.base_knowledge_url}knowledge_view/`
    const body = { "article": article, 'useful': useful, 'viewed': 'true' }
    // Hello
    this.cache.deleteContaining("get_user_activity/articles/");
    return this.httpService.post(this.called_url, body, { headers: this.getHeader() });
  }

  ifArticleBookmarkedByUser(article_id) {
    if (article_id) {
      this.called_url = `${this.base_knowledge_url}knowledge_view/${article_id}/`;
      return this.httpService.get(this.called_url, { headers: this.getHeader() });
    }
  }

  addFeedback(article_id: string, feedback: string) {
    this.called_url = `${this.base_knowledge_url}articles/${article_id}/feedback/`;
    const body = { "feedback": feedback };
    return this.httpService.post(this.called_url, body, { headers: this.getHeader() });
  }

  getKnowledgeBases() {
    this.called_url = `${this.base_knowledge_url}knowledge_base/get_knowledge_bases/`
    return this.httpService.get(this.called_url, { headers: this.getHeader() });
  }

  getRelatedCategories(kb_base, kb_category, course) {
    if (course == "course") {
      this.called_url = `${this.base_knowledge_url}${kb_base}/categories/${kb_category}/courses/`;
    } else {
      this.called_url = `${this.base_knowledge_url}${kb_base}/categories/${kb_category}/tree/`;
    }
    return this.httpService.get(this.called_url, { headers: this.getHeader() });
  }

  getRelatedSectionAndArticles(kb_category) {
    this.called_url = `${this.base_knowledge_url}course/${kb_category}/`;
    return this.httpService.get(this.called_url, { headers: this.getHeader() });
  }

  getBreadCrumbFromCategory(category) {
    this.called_url = `${this.base_knowledge_url}knowledge_crumb/${category}/`
    return this.httpService.get(this.called_url, { headers: this.getHeader() });
  }

  setCourseProgress(course, progress) {
    this.called_url = `${this.base_knowledge_url}course_progress/`
    const body = { 'course': course, 'progress': progress }
    this.cache.deleteContaining('get_user_activity/courses/');
    return this.httpService.post(this.called_url, body, { headers: this.getHeader() });
  }

  getCategoriesForSideNav(kb_base) {
    this.called_url = `${this.base_knowledge_url}${kb_base}/categories_kb_base`;
    return this.httpService.get(this.called_url, { headers: this.getHeader() });
  }

  getSearchResults(query_key) {
    this.called_url = `${this.base_knowledge_url}query/${query_key}`;
    return this.httpService.get(this.called_url, { headers: this.getHeader() });
  }

  getQuotes() {
    this.called_url = `https://type.fit/api/quotes`;
    return this.httpService.get(this.called_url, { headers: this.getHeader() });
  }

  operateArticles(article, id, title, description) {
    this.called_url = `${this.base_knowledge_url}kb_knowledge/article/`;
    const body = {
      "article": article,
      "description": description,
      "title": title,
      "id": id,
      "publish_ready": false,
      "body_data": JSON.stringify(article["blocks"])
    };
    // console.log(body);
    this.cache.deleteInstant(`${this.base_knowledge_url}articles/${id}/`);
    // console.log(`${this.base_knowledge_url}articles/${id}/`);
    return this.httpService.post(this.called_url, body, { headers: this.getHeader() });
  }

  checkProfanity(article){
    // this.called_url = `${this.base_knowledge_url}kb_knowledge/check_profanity/`;
    this.called_url = `https://services-django.herokuapp.com/profanity/check/`;
    const body = {
      "data": article["blocks"]
    }
    return this.httpService.post(this.called_url, body, {headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })});
  }

  wakeUpCall(){
    this.called_url = `https://services-django.herokuapp.com/profanity/wake/`;
    return this.httpService.get(this.called_url, {headers: this.getHeader()});
  }

  publishArticles(article, id, title, description) {
    this.called_url = `${this.base_knowledge_url}kb_knowledge/article/`;
    const body = {
      "article": article,
      "title": title,
      "id": id,
      "publish_ready": true,
      "body_data": JSON.stringify(article["blocks"]),
      "description": description
    };
    // console.log(body);
    this.cache.deleteInstant(`${this.base_knowledge_url}articles/${id}/`);
    // console.log(`${this.base_knowledge_url}articles/${id}/`);
    return this.httpService.post(this.called_url, body, { headers: this.getHeader() });
  }

  getAllCourses() {
    this.called_url = `${this.base_knowledge_url}kb_category/courses/`;
    return this.httpService.get(this.called_url, { headers: this.getHeader() });
  }

  addArticleToCourse(course_id, article_id) {
    this.called_url = `${this.base_knowledge_url}kb_sections/article/insert/`;
    const body = { "article_id": article_id, "course_id": course_id };
    return this.httpService.post(this.called_url, body, { headers: this.getHeader() });
  }

  addPathOrBranch(form_data, type) {
    this.called_url = `${this.base_knowledge_url}kb_category/add/`;
    const body = { "form_data": form_data, "type": type };
    return this.httpService.post(this.called_url, body, { headers: this.getHeader() });
  }

  buildPathForCourse(course, path, deleteSectionIdArray) {
    this.called_url = `${this.base_knowledge_url}kb_section/path/`;
    const body = { "course": course, "path": path, "deleteSections": deleteSectionIdArray };
    this.cache.deleteInstant(`${this.base_knowledge_url}course/${course}/`);
    return this.httpService.post(this.called_url, body, { headers: this.getHeader() });
  }

  ifCourseOwner(course) {
    this.called_url = `${this.base_knowledge_url}path_valid_user/${course}/`;
    return this.httpService.get(this.called_url, { headers: this.getHeader() });
  }

  deleteArticle(id){
    this.called_url = `${this.base_knowledge_url}kb_knowledge/delete/`;
    const body = {'article_id': id};
    this.cache.deleteContaining('user/kb_knowledge/author/');
    return this.httpService.post(this.called_url, body, {headers: this.getHeader()});
  }

  getAllTags(){
    this.called_url = `${this.base_knowledge_url}tag/`;
    return this.httpService.get(this.called_url, {headers: this.getHeader()});
  }

  getArticleTags(article_id){
    this.called_url = `${this.base_knowledge_url}tag/${article_id}/`;
    return this.httpService.get(this.called_url, {headers: this.getHeader()});
  }

  postTag(label){
    this.called_url = `${this.base_knowledge_url}tag/`;
    const body = {
      "label": label
    }
    this.cache.deleteContaining('tag/');
    return this.httpService.post(this.called_url, body, {headers: this.getHeader()});
  }

  postArticleTag(article_id, tag_id){
    this.called_url = `${this.base_knowledge_url}tag/${article_id}/`;
    const body = {
      "tag_id": tag_id,
      "action": 'insert'
    }
    this.cache.deleteContaining('tag/'+article_id+'/');
    return this.httpService.post(this.called_url, body, {headers: this.getHeader()});
  }

  delArticleTag(article_id, tag_id){
    this.called_url = `${this.base_knowledge_url}tag/${article_id}/`;
    const body = {
      "tag_id": tag_id,
      "action": 'delete'
    }
    // this.cache.deleteContaining('tag/'+article_id+'/');
    return this.httpService.post(this.called_url, body, {headers: this.getHeader()});
  }

  editArticleTag(article_id, tag_id, relevance){
    this.called_url = `${this.base_knowledge_url}tag/${article_id}/`;
    const body = {
      "tag_id": tag_id,
      "action": "edit",
      "relevance": relevance
    }
    return this.httpService.post(this.called_url, body, {headers: this.getHeader()});
  }
}
