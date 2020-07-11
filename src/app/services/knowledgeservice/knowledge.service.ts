import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../authservice/auth.service';
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

}
