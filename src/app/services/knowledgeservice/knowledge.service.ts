import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlconfigService } from '../urlconfig.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  base_url = this.urlService.getUrl()

  base_knowledge_url = `${this.base_url}knowledge/`

  called_url: string;

  constructor(private httpService: HttpClient,
    private urlService: UrlconfigService,
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

  getKnowledgeUrl(){
    return `${this.base_knowledge_url}`;
  }

  addBookmarkArticle(article_id: string){
    this.called_url = `${this.base_knowledge_url}bookmark_this_article/`;
    const body = {"article_id": article_id};
    return this.httpService.post(this.called_url, body, {headers: this.getHeader()});
  }

  getArticleById(article_id: string){
    this.called_url = `${this.base_knowledge_url}articles/${article_id}/`;
    return this.httpService.get(this.called_url, {headers: this.getHeader()});
  }

  postUseArticle(article, useful){
    this.called_url = `${this.base_knowledge_url}knowledge_view/`
    const body = {"article": article, 'useful': useful, 'viewed': 'true'}
    return this.httpService.post(this.called_url, body, {headers: this.getHeader()});
  }

  ifArticleBookmarkedByUser(article_id){
    if (article_id){
    this.called_url = `${this.base_knowledge_url}knowledge_view/${article_id}/`;
    return this.httpService.get(this.called_url, {headers: this.getHeader()});
    }
  }

  addFeedback(article_id: string, feedback: string){
    this.called_url = `${this.base_knowledge_url}articles/${article_id}/feedback/`;
    const body = {"feedback": feedback};
    return this.httpService.post(this.called_url, body, {headers: this.getHeader()});
  }

  getKnowledgeBases(){
    this.called_url = `${this.base_knowledge_url}knowledge_base/get_knowledge_bases/`
    return this.httpService.get(this.called_url, {headers: this.getHeader()});
  }

  getRelatedCategories(kb_base, kb_category, course){
    if(course=="course"){
      this.called_url = `${this.base_knowledge_url}${kb_base}/categories/${kb_category}/courses/`;
    }else{
      this.called_url = `${this.base_knowledge_url}${kb_base}/categories/${kb_category}/tree/`;    
    }
    return this.httpService.get(this.called_url, {headers: this.getHeader()});
  }

  getRelatedSectionAndArticles(kb_category){
    this.called_url = `${this.base_knowledge_url}course/${kb_category}/`
    return this.httpService.get(this.called_url, {headers: this.getHeader()});
  }

  getBreadCrumbFromCategory(category){
    this.called_url = `${this.base_knowledge_url}knowledge_crumb/${category}/`
    return this.httpService.get(this.called_url, {headers: this.getHeader()});
  }

  setCourseProgress(course, progress){
    this.called_url = `${this.base_knowledge_url}course_progress/`
    const body = {'course': course, 'progress': progress}
    return this.httpService.post(this.called_url, body, {headers: this.getHeader()});
  }

  getCategoriesForSideNav(kb_base){
    this.called_url = `${this.base_knowledge_url}${kb_base}/categories_kb_base`;
    return this.httpService.get(this.called_url, {headers: this.getHeader()});
  }
  
  getSearchResults(query_key){
    this.called_url = `${this.base_knowledge_url}query/${query_key}`;
    return this.httpService.get(this.called_url, {headers: this.getHeader()});
  }

  getQuotes(){
    this.called_url = `https://type.fit/api/quotes`;
    return this.httpService.get(this.called_url, {headers: this.getHeader()});
  }

  operateArticles(article, id){
    console.log(article, id);
    this.called_url = `${this.base_knowledge_url}kb_knowledge/article/`;
    const body ={"article": article, "id": id, "publish_ready": false, "body_data": JSON.stringify(article["blocks"])} ;
    return this.httpService.post(this.called_url, body, {headers: this.getHeader()});
  }


  publishArticles(article, id){
    console.log(article, id);
    this.called_url = `${this.base_knowledge_url}kb_knowledge/article/`;
    const body ={"article": article, "id": id, "publish_ready": true, "body_data": JSON.stringify(article["blocks"])} ;
    return this.httpService.post(this.called_url, body, {headers: this.getHeader()});
  }

  
}
